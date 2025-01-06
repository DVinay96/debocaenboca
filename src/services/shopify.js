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
            
            if (response.data.data.checkoutCreate.checkoutUserErrors.length > 0) {
                throw new Error(response.data.data.checkoutCreate.checkoutUserErrors[0].message);
            }

            return response.data.data.checkoutCreate.checkout.webUrl;
        } catch (error) {
            console.error('Error creating checkout:', error);
            throw error;
        }
    }
}

export default shopifyService;