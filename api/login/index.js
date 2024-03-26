

// Make the GET request using the async/await syntax
async function redirectToLoginWithLinkedIn(context, req, res) {

   // Basic securoty check on JoinKey
   var path = req.query.joinpath;
   if (path.startsWith (process.env.JoinKey)) {

      // https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS1
      var clientID = "78xh72q2fcu5wv";
      var redirectUrl = "http://localhost:1337/api/auth/";
      var scope = 'openid profile email';
      var state = JSON.stringify (req.query);
      var redirect = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + clientID + "&redirect_uri=" + redirectUrl + "&scope=" + scope + "&state=" + state;

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
   }
}

 
module.exports = async function (context, req, res) {

   await redirectToLoginWithLinkedIn (context, req, res);
}