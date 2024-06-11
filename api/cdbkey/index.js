

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
         status: 500
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

   try {
                                       
      var access_token = process.env.CosmosApiKey;

      return access_token;
   }
   catch (e) {
      console.error (e);

      return undefined;
   }  
}