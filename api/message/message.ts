import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

// Azure plumbing 
export async function message(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {

    let sessionKey = request.query.get('name') || "";

    return messageCommonApi (sessionKey);
};

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: message
});
// End of Azure plumbing 

// Wrapper function that can be called from local node server for debugging. 
export async function messageLocalApi (sessionKey: string): Promise<HttpResponseInit> {

    return messageCommonApi (sessionKey);
}

// All logic needs to be in here - so we can debug locally, then run on Azure
async function messageCommonApi (sessionKey: string): Promise<HttpResponseInit> {

    return { body: `Hello, ${sessionKey}!` };    
}
