import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    swagger: "2.0",
    info: {
      title: "Help Me Out End Point Documentation",
      version: "1.0.0",
      description: "API for Help Me Out End Point Documentation",
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
