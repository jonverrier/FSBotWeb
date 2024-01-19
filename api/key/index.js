

module.exports = async function (context, req) {


   context.res = {
       /* Defaults to status 200 */
       body: process.env.joinKey
    };
}