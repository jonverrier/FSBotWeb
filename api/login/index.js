
// Make the GET request using the async/await syntax
async function loginWithLinkedIn(req) {

     // https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS1
     var clientID = "78xh72q2fcu5wv";
     var redirectUrl = "http://localhost:1337/api/auth/";
     var scope = 'openid profile email';
     var redirect = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + clientID + "&redirect_uri=" + redirectUrl + "&scope=" + scope + "&state=" + process.env.JoinKey;

     req.redirect (redirect);
 }

 
module.exports = async function (context, req) {

   await loginWithLinkedIn (context.res);

   context.res = {
      /* Defaults to status 200 */
   };
}