import * as msal from "@azure/msal-browser";

const aDClientId = `${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`;
const aDTenantId = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`;
const redirectUri = '/'
console.log('%cmsal.js line:6 aDClientId', 'color: #007acc;', aDClientId);
console.log('%cmsal.js line:7 aDTenantId', 'color: #007acc;', aDTenantId);
const msalConfig = {
    auth: {
        clientId: aDClientId,
        authority: aDTenantId,
        redirectUri: redirectUri
    }
}

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance }