import axios from "axios";

const shopifyConfig = {
    shopName: process.env.REACT_APP_SHOPIFY_STORE_NAME,
    storefrontToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_TOKEN,
    apiVersion: '2024-01'
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

// Helper function to retry an operation multiple times
const retry = async (operation, maxRetries = 3, delay = 500) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            lastError = error;
            
            if (attempt < maxRetries) {
                // Wait before the next retry
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    // If we got here, all retries failed
    throw lastError;
};

const shopifyService = {
    getProducts: async () => {
        try {
            const query = {
                query: `
                    {
                        products(first: 20) {
                            edges {
                                node {
                                    id
                                    title
                                    description
                                    variants(first: 1) {
                                        edges {
                                            node {
                                                id  # This is important for checkout
                                                price {
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
                `
            };
    
            const response = await shopifyClient.post('/graphql.json', query);
            return response.data.data.products.edges.map(({ node }) => ({
                id: node.id,
                title: node.title,
                description: node.description,
                variants: node.variants,  // Include the full variants object
                price: node.variants.edges[0]?.node.price,
                image: node.images.edges[0]?.node,
                availableForSale: node.variants.edges[0]?.node.availableForSale
            }));
        } catch (error) {
            console.log('Error fetching products:', error);
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
                image: product.images.edges[0]?.node,
                availableForSale: product.variants.edges[0]?.node.availableForSale
            };
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    createCheckout: async (cart) => {
        // Use the retry helper to attempt checkout multiple times
        return retry(async () => {
            try {
                const lineItems = cart.map(item => ({
                    variantId: item.variants.edges[0]?.node.id,
                    quantity: item.quantity
                }));

                const query = {
                    query: `
                        mutation createCheckout($lineItems: [CheckoutLineItemInput!]!) {
                            checkoutCreate(input: {
                                lineItems: $lineItems
                            }) {
                                checkout {
                                    id
                                    webUrl
                                    lineItems(first: 250) {
                                        edges {
                                            node {
                                                id
                                                title
                                                quantity
                                            }
                                        }
                                    }
                                }
                                checkoutUserErrors {
                                    code
                                    field
                                    message
                                }
                            }
                        }
                    `,
                    variables: {
                        lineItems: lineItems
                    }
                };

                const response = await shopifyClient.post('/graphql.json', query);
                
                // Safely check if we have a valid response before accessing properties
                if (!response.data || !response.data.data || !response.data.data.checkoutCreate) {
                    throw new Error('Invalid checkout response from Shopify API');
                }
                
                const checkoutCreate = response.data.data.checkoutCreate;
                
                // Check for user errors if the property exists
                if (checkoutCreate.checkoutUserErrors && 
                    Array.isArray(checkoutCreate.checkoutUserErrors) && 
                    checkoutCreate.checkoutUserErrors.length > 0) {
                    throw new Error(checkoutCreate.checkoutUserErrors[0].message);
                }
                
                // Verify we have a checkout with a webUrl
                if (!checkoutCreate.checkout || !checkoutCreate.checkout.webUrl) {
                    throw new Error('No checkout URL provided');
                }

                return checkoutCreate.checkout.webUrl;
            } catch (error) {
                console.error('Error creating checkout:', error);
                throw error;
            }
        }, 5, 800); // Retry up to 3 times with 800ms delay between attempts
    }
}

export default shopifyService;