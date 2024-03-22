
// Import the axios library
const axios = require('axios');

// Make the GET request using the async/await syntax
async function loginWithLinkedIn(req) {

     // Await the GET request and assign the response object to a variable
     var state="DCEeFWf45A53sdfKef424";
     var clientID = "78xh72q2fcu5wv";
     var redirectUrl = "http://localhost:1337/api/auth/";
     var redirect = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=" + clientID + "&redirect_uri=" + redirectUrl + "&scope=email&state=" + state;

     req.redirect (redirect);

     /*
     const response = await axios.get(redirect, {
       headers: {
         'User-Agent': 'Node.js'
       }
     });
 
     // Log the status code and the data
     console.log(`Status code: ${response.status}`);
     console.log(`Data: ${JSON.stringify(response.data)}`);

   } catch (error) {
     // Log the error message and code
     console.log(`Error message: ${error.message}`);
     console.log(`Error code: ${error.code}`);
 
     // Log the response status and data if available
     if (error.response) {
       console.log(`Response status: ${error.response.status}`);
       console.log(`Response data: ${JSON.stringify(error.response.data)}`);
     }
     */
 }

 
module.exports = async function (context, req) {

       await loginWithLinkedIn (req);

       context.res = {
          /* Defaults to status 200 */
          body: process.env.AiKey
       };
 }