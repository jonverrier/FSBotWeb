
// Import the axios library
const axios = require('axios');
const qs = require('qs');

async function requestKey (context, res) {
   
   var key = process.env.MongoAPiKey;

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
   }
}

module.exports = async function (context, req, res) {

    if (req.query.JoinKey == process.env.JoinKey) {
       var key = await requestKey ();

       if (res) {
         res.send(key);         
       } else {
          context.res = {
             /* Defaults to status 200 */
             body: key
          };
      }
    }
    else {
      console.error ("JoinKey validation failed.")
      if (res) {
         res.send(undefined);   
       } else {
          context.res = {
            status: 400
          };
      }  
    }
 
 }