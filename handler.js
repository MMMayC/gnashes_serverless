const handler = require("serverless-express/handler");
const app = require("./express-api-endpoint/api");

// Please change this to match the serverless yaml -- vice-versa
exports.api = handler(app);
