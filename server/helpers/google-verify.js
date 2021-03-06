const { OAuth2Client } = require('google-auth-library');
const config = require('../config/config');
const client = new OAuth2Client(config.google_id);


const verifyGoogle = async ( token ) => {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.google_id,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = {
    verifyGoogle
}