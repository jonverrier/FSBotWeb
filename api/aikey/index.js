

module.exports = async function (context, req) {

    if (req.query.session == process.env.SessionKey) {
       context.res = {
          /* Defaults to status 200 */
          body: process.env.AzureAiKey
       };
    }
    else {
       // Put this back when need to debug 
        // context.res = {
        //    /* Defaults to status 200 */
        //    body: "Error:" + req.query.sessionKey
        // };    
    }
 
 }