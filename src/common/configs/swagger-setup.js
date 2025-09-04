import swaggerAutogen from "swagger-autogen";
import { HOST, PORT } from "./enviroments.js";

const outputFile = "./src/common/configs/swagger-output.json";
const endpointsFiles = ["./src/routes/index.js"];

const swaggerConfig = {
  info: {
    title: "Backend API Codefarm Ecommerce K01 ThayHoangJS",
    description: "API Codefarm By ThayHoangJS",
    version: "1.0.0",
  },
  host: `${HOST}:${PORT}`,
  basePath: "/api",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    BearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

// ✅ Gọi đúng cách
swaggerAutogen({ openapi: "3.0.0" })(
  outputFile,
  endpointsFiles,
  swaggerConfig
).then(() => {
  console.log("✅ Swagger JSON generated successfully");
});
