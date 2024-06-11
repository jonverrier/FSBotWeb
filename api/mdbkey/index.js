
// Import the axios library
const axios = require('axios');
const qs = require('qs');

module.exports = async function (context, req, res) {

   var key = await dbCommonApi (req.query.session);

   if (res) {
      // Running locally, not in Azure
      res.send (key);
      return;
   }
   
   if (key) {
      context.res = {
         /* Defaults to status 200 */
         body: key
      };
   }
   else {
      context.res = {
         status: 400
      };
   }
 }

 // End of Azure plumbing 


// All logic needs to be in here - so we can debug locally, then run on Azure
async function dbCommonApi (sessionKey) {

   if ((sessionKey !== process.env.SessionKey) && (sessionKey !== process.env.SessionKey2)) {
      console.error ("Session key validation falied getting DB Key");
      return undefined;
   }

   var key = process.env.MongoApiKey;

   const accessConfig = {
      headers: {
         "Content-Type": "application/json",                  
         "Accept": "application/json"
      }
   }   

   var data = {
      "key": key
   };

   try {
      const accessRes = await axios.post('https://eu-west-1.aws.services.cloud.mongodb.com/api/client/v2.0/app/braidlmsclient-fsivu/auth/providers/api-key/login', 
                                         data, accessConfig);
                                    
      var access_token = accessRes.data.access_token;

      return access_token;
   }
   catch (e) {
      console.error (e);

      return undefined;
   }  
}