// swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Bags Shop API',
      version: '1.0.0',
      description: 'API documentation for Bags Shop',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Your server URL
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes/*.js', './routes/*.ts'], // Path to the API route files (modify as needed)
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerSpec, swaggerUi };
