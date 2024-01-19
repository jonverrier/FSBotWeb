

module.exports = async function (context, req) {

   if (req.params.JoinKey == process.env.JoinKey) {
      context.res = {
         /* Defaults to status 200 */
         body: process.env.ApiKey
      };
   }
else {
    context.res = {
        /* Defaults to status 200 */
        body: "Error:" + req.params.JoinKey
     };    
}

}