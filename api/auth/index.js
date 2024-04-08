
// Import the axios library
const axios = require('axios');
const qs = require('qs');

async function redirectWithEmail (code, session, conversation, context, res) {

  try {

    const accessConfig = {
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
       }
    }

    // https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS1
    // grant_type	string	The value of this field should always be: authorization_code	Yes
    // code	string	The authorization code you received in Step 2.	Yes
    // client_id	string	The Client ID value generated in Step 1.	Yes
    // client_secret	string	The Secret Key value generated in Step 1. See the Best Practices Guide for ways to keep your client_secret value secure.	Yes
    // redirect_uri	url	The same redirect_uri value that you passed in the previous step.	Yes
     var clientID = "78xh72q2fcu5wv";
     var redirectUrl = res ? "http://localhost:1337/api/auth/" : "https://braidapps.io/api/auth/";

     var data = {
        grant_type : 'authorization_code',
        code : code,
        client_id: clientID,
        client_secret: process.env.LinkedInSecret,
        redirect_uri: redirectUrl
     };

     const accessRes = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', qs.stringify(data), accessConfig);
        
     var access_token = accessRes.data.access_token;     

     const profileConfig = {
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization' : `Bearer ${access_token}`
        }
     }

     const profileRes = await axios.get(' https://api.linkedin.com/v2/userinfo', profileConfig);

     var redirect = "/aibot.html#&session=" + session + "&conversation=" + conversation + "&email=" + profileRes.data.email;

     if (res) {
        res.redirect (redirect);
     } 
     else {
        context.res = {
           status: 302,
           headers: {
             'Location': redirect
           },
           body: 'Redirecting...'
        };         
      }   

  } catch (err) {

     console.error(err);
     if (res) {
      res = {
         status: 400
      };
    } else {
       context.res = {
         status: 400
       };
   }       
  }
}

module.exports = async function (context, req, res) {   

   var parsed = JSON.parse (req.query.state);

   if (parsed.session.startsWith (process.env.JoinKey) && req.query.code) {

      await redirectWithEmail (req.query.code, parsed.session, parsed.conversation, context, res);
   } else {
      if (res) {
         res = {
            status: 400
         };
       } else {
          context.res = {
            status: 400
          };
      }        
   }
}