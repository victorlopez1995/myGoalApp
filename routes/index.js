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
// router.use(
//   auth({
//     routes: {
//       // Override the default login route to use your own login route as shown below
//       login: false,
//       // Pass a custom path to redirect users to a different
//       // path after logout.
//       postLogoutRedirect: '/custom-logout',
//       // Override the default callback route to use your own callback route as shown below
//     },
//   })
// );
// router.get('/login', (req, res) =>
//   res.oidc.login({
//     returnTo: '/profile',
//     authorizationParams: {
//       redirect_uri: 'http://localhost:3000/callback',
//     },
//   })
// );

// router.get('/custom-logout', (req, res) => res.send('Bye!'));

// router.get('/callback', (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );

// router.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
//   res.oidc.callback({
//     redirectUri: 'http://localhost:3000/callback',
//   })
// );

router.use('/', require('./swagger'));

// Home page route
router.use("/user",requiresAuth(), require("./user"));

// About page route
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;