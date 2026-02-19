const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Task Management API",
    version: "1.0.0",
    description: "SammTech Backend Developer Intern Task - Task Management REST API",
  },
  servers: [
    { url: "http://localhost:4000", description: "Local server" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // we will add docs in route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;