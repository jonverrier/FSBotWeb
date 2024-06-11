

module.exports = async function (context, req) {

   if ((req.query.session === process.env.SessionKey) || (req.query.session === process.env.SessionKey2)) {
      context.res = {
         /* Defaults to status 200 */
         body: process.env.ConversationKey
      };
   }
   else {
      context.res = {
         status: 500,
         body: "Error, session key validation failed:" + req.query.sessionKey
      }; 
   }

}