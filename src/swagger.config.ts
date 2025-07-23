import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hermit Crab API",
      version: "1.0.0",
      description: "API documentation for the Hermit Crab application. To see more details, visit the GitHub repository on link below.",
      contact: {
        name: "Icaro",
        url: "https://github.com/FlightofIcarus/hermit-api",
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], 
};

export const swaggerSpec = swaggerJsdoc(options);