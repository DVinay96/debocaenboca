import axios from "axios";

const shopifyConfig = {
    shopName: process.env.REACT_APP_SHOPIFY_STORE_NAME,
    storefrontToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN,
    apiVersion: '2024-07' 
}

if (!shopifyConfig.shopName || !shopifyConfig.storefrontToken) {
    throw new Error('Missing required Shopify configuration. Please check your .env file.');
}

const shopifyClient = axios.create({
    baseURL: `https://${shopifyConfig.shopName}.myshopify.com/api/${shopifyConfig.apiVersion}`,
    headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontToken
    }
})

const retry = async (operation, maxRetries = 3, delay = 500) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            lastError = error;
            
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
};

const shopifyService = {
    getProducts: async () => {
        try {
            const collectionId = "gid://shopify/Collection/295870726237";
            
            const query = {
                query: `
                    {
                        collection(id: "${collectionId}") {
                            id
                            title
                            products(first: 20) {
                                edges {
                                    node {
                                        id
                                        title
                                        description
                                        variants(first: 1) {
                                            edges {
                                                node {
                                                    id  # This is important for cart
                                                    price {
                                                        amount
                                                        currencyCode
                                                    }
                                                    compareAtPrice {
                                                        amount
                                                        currencyCode
                                                    }
                                                    availableForSale
                                                }
                                            }
                                        }
                                        images(first: 1) {
                                            edges {
                                                node {
                                                    url
                                                    altText
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                `
            };
    
            const response = await shopifyClient.post('/graphql.json', query);
            
            if (!response.data || !response.data.data || !response.data.data.collection) {
                throw new Error('Collection "De Boca en Boca" not found. Please check the collection ID.');
            }
            
            const collection = response.data.data.collection;
            console.log(`Found collection: "${collection.title}" with ${collection.products.edges.length} products`);
            
            return collection.products.edges.map(({ node }) => ({
                id: node.id,
                title: node.title,
                description: node.description,
                variants: node.variants, 
                price: node.variants.edges[0]?.node.price,
                compareAtPrice: node.variants.edges[0]?.node.compareAtPrice,
                image: node.images.edges[0]?.node,
                availableForSale: node.variants.edges[0]?.node.availableForSale
            }));
        } catch (error) {
            console.error('Error fetching products from De Boca en Boca collection:', error);
            throw error;
        }
    },
    
    getProduct: async (productId) => {
        try {
            const query = {
                query: `
                    {
                        product(id: "${productId}") {
                            id
                            title
                            description
                            variants(first: 1) {
                                edges {
                                    node {
                                        id
                                        price {
                                            amount
                                            currencyCode
                                        }
                                        compareAtPrice {
                                            amount
                                            currencyCode
                                        }
                                        availableForSale
                                    }
                                }
                            }
                            images(first: 1) {
                                edges {
                                    node {
                                        url
                                        altText
                                    }
                                }
                            }
                        }
                    }
                `
            };

            const response = await shopifyClient.post('/graphql.json', query);
            const product = response.data.data.product;
            return {
                id: product.id,
                title: product.title,
                description: product.description,
                price: product.variants.edges[0]?.node.price,
                compareAtPrice: product.variants.edges[0]?.node.compareAtPrice,
                image: product.images.edges[0]?.node,
                availableForSale: product.variants.edges[0]?.node.availableForSale
            };
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    createCart: async (cart) => {
        return retry(async () => {
            try {
                const lines = cart.map(item => ({
                    merchandiseId: item.variants.edges[0]?.node.id,
                    quantity: item.quantity
                }));

                const query = {
                    query: `
                        mutation cartCreate($cartInput: CartInput!) {
                            cartCreate(input: $cartInput) {
                                cart {
                                    id
                                    checkoutUrl
                                    lines(first: 250) {
                                        edges {
                                            node {
                                                id
                                                quantity
                                                merchandise {
                                                    ... on ProductVariant {
                                                        id
                                                        title
                                                        product {
                                                            title
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    cost {
                                        totalAmount {
                                            amount
                                            currencyCode
                                        }
                                        subtotalAmount {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                                userErrors {
                                    code
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        cartInput: {
                            lines: lines
                        }
                    }
                };

                const response = await shopifyClient.post('/graphql.json', query);
                
                if (!response.data || !response.data.data || !response.data.data.cartCreate) {
                    throw new Error('Invalid cart response from Shopify API');
                }
                
                const cartCreate = response.data.data.cartCreate;
                
                if (cartCreate.userErrors && 
                    Array.isArray(cartCreate.userErrors) && 
                    cartCreate.userErrors.length > 0) {
                    throw new Error(cartCreate.userErrors[0].message);
                }
                
                if (!cartCreate.cart || !cartCreate.cart.checkoutUrl) {
                    throw new Error('No checkout URL provided');
                }

                return {
                    cartId: cartCreate.cart.id,
                    checkoutUrl: cartCreate.cart.checkoutUrl,
                    cart: cartCreate.cart
                };
            } catch (error) {
                console.error('Error creating cart:', error);
                throw error;
            }
        }, 5, 800);
    },

    addToCart: async (cartId, items) => {
        return retry(async () => {
            try {
                const lines = items.map(item => ({
                    merchandiseId: item.variants.edges[0]?.node.id,
                    quantity: item.quantity
                }));

                const query = {
                    query: `
                        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
                            cartLinesAdd(cartId: $cartId, lines: $lines) {
                                cart {
                                    id
                                    checkoutUrl
                                    lines(first: 250) {
                                        edges {
                                            node {
                                                id
                                                quantity
                                                merchandise {
                                                    ... on ProductVariant {
                                                        id
                                                        title
                                                        product {
                                                            title
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    cost {
                                        totalAmount {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                                userErrors {
                                    code
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        cartId: cartId,
                        lines: lines
                    }
                };

                const response = await shopifyClient.post('/graphql.json', query);
                const cartLinesAdd = response.data.data.cartLinesAdd;
                
                if (cartLinesAdd.userErrors && cartLinesAdd.userErrors.length > 0) {
                    throw new Error(cartLinesAdd.userErrors[0].message);
                }

                return cartLinesAdd.cart;
            } catch (error) {
                console.error('Error adding to cart:', error);
                throw error;
            }
        }, 5, 800);
    },

    updateCartLines: async (cartId, lines) => {
        return retry(async () => {
            try {
                const query = {
                    query: `
                        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
                            cartLinesUpdate(cartId: $cartId, lines: $lines) {
                                cart {
                                    id
                                    checkoutUrl
                                    lines(first: 250) {
                                        edges {
                                            node {
                                                id
                                                quantity
                                                merchandise {
                                                    ... on ProductVariant {
                                                        id
                                                        title
                                                        product {
                                                            title
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    cost {
                                        totalAmount {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                                userErrors {
                                    code
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        cartId: cartId,
                        lines: lines
                    }
                };

                const response = await shopifyClient.post('/graphql.json', query);
                const cartLinesUpdate = response.data.data.cartLinesUpdate;
                
                if (cartLinesUpdate.userErrors && cartLinesUpdate.userErrors.length > 0) {
                    throw new Error(cartLinesUpdate.userErrors[0].message);
                }

                return cartLinesUpdate.cart;
            } catch (error) {
                console.error('Error updating cart lines:', error);
                throw error;
            }
        }, 5, 800);
    },

    removeFromCart: async (cartId, lineIds) => {
        return retry(async () => {
            try {
                const query = {
                    query: `
                        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
                            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                                cart {
                                    id
                                    checkoutUrl
                                    lines(first: 250) {
                                        edges {
                                            node {
                                                id
                                                quantity
                                                merchandise {
                                                    ... on ProductVariant {
                                                        id
                                                        title
                                                        product {
                                                            title
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    cost {
                                        totalAmount {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                                userErrors {
                                    code
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        cartId: cartId,
                        lineIds: lineIds
                    }
                };

                const response = await shopifyClient.post('/graphql.json', query);
                const cartLinesRemove = response.data.data.cartLinesRemove;
                
                if (cartLinesRemove.userErrors && cartLinesRemove.userErrors.length > 0) {
                    throw new Error(cartLinesRemove.userErrors[0].message);
                }

                return cartLinesRemove.cart;
            } catch (error) {
                console.error('Error removing from cart:', error);
                throw error;
            }
        }, 5, 800);
    },

    getCart: async (cartId) => {
        try {
            const query = {
                query: `
                    query cart($cartId: ID!) {
                        cart(id: $cartId) {
                            id
                            checkoutUrl
                            lines(first: 250) {
                                edges {
                                    node {
                                        id
                                        quantity
                                        merchandise {
                                            ... on ProductVariant {
                                                id
                                                title
                                                product {
                                                    title
                                                }
                                                price {
                                                    amount
                                                    currencyCode
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            cost {
                                totalAmount {
                                    amount
                                    currencyCode
                                }
                                subtotalAmount {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                `,
                variables: {
                    cartId: cartId
                }
            };

            const response = await shopifyClient.post('/graphql.json', query);
            return response.data.data.cart;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },

    createCheckout: async (cart) => {
        console.warn('createCheckout is deprecated. Use createCart instead.');
        const result = await shopifyService.createCart(cart);
        return result.checkoutUrl; 
    }
}

export default shopifyService;