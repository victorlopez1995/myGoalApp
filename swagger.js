const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Description',
  },
  "securityDefinitions": {
    "Bearer": {
        "type": "apiKey",
        "name": "Authorization",
        "in": "header"
    },
    "api_key": {
      "type": "apiKey",
      "name": "api_key",
      "in": "header"
  },
  "oauth": {
    "type": "oauth2",
    "authorizationUrl": "http://api.example.com/api/auth/",
    "flow": "implicit",
    "scopes": {
        "read:players": "read player data"
    }
  }
  },
  "security": [
    {
        "Bearer": []
    }
  ],
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);