
// Import the axios library
const axios = require('axios');
const qs = require('qs');

async function getLinkedInUserName (code, state) {

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
     var redirectUrl = "http://localhost:1337/api/auth/";

     var data = {
        grant_type : 'authorization_code',
        code : code,
        client_id: clientID,
        client_secret: process.env.LinkedInSecret,
        redirect_uri: redirectUrl
     };

     const accessRes = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', qs.stringify(data), accessConfig);
     
     console.log ("Access:");     
     console.log (accessRes.data);     
     var access_token = accessRes.data.access_token;     

     const profileConfig = {
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization' : `Bearer ${access_token}`
        }
     }

     const profileRes = await axios.get(' https://api.linkedin.com/v2/userinfo', profileConfig);

     console.log ("Profile:");
     console.log (profileRes.data);

  } catch (err) {

     console.error(err);
  }

}

module.exports = async function (context, req) {

   console.log (req.query.state);
   console.log (req.query.code);

   if (req.query.error_description)
      console.log (req.query.error_description);    

   if (req.query.state == process.env.JoinKey && req.query.code) {

      var name = await getLinkedInUserName (req.query.code, req.query.state).then ((name))

      context.res = {
         /* Defaults to status 200 */
      };

   }
}