const express = require("express");
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

router.use(auth(config));

router.use('/', require('./swagger'));

// Home page route
router.use("/user",requiresAuth(), require("./user"));

// About page route
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = router;