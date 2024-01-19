

module.exports = async function (context, req) {

   if (req.query.JoinKey == process.env.JoinKey) {
      context.res = {
         /* Defaults to status 200 */
         body: process.env.ApiKey
      };
   }
else {
    // Put this back when need to debug 
    // context.res = {
    //    /* Defaults to status 200 */
    //    body: "Error:" + req.query.JoinKey
    // };    
}

}