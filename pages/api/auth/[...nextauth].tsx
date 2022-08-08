import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
export default NextAuth({
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_TENANT_NAME,
      clientId: "eda28952-d2a6-4c20-a6f9-7d09afe82d80",
      clientSecret: "uvI8Q~ezcxOUhyRci4k5DXjv1nBCk~2OUMlFba37",
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,
      wellKnown:
        "https://GeorgesHiveB2CPrototype.b2clogin.com/GeorgesHiveB2CPrototype.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_Hive_Prototype_signin_signup",
      authorization: {
        params: {
          scope: `  https://GeorgesHiveB2CPrototype.onmicrosoft.com/hive-api/tasks.read https://GeorgesHiveB2CPrototype.onmicrosoft.com/hive-api/tasks.write offline_access openid `,
        },
      },
      checks: ["state", "pkce"],
      client: {
        token_endpoint_auth_method: "none",
      },
    }),
  ],
  // clientId: "eda28952-d2a6-4c20-a6f9-7d09afe82d80",
  // clientSecret: "uvI8Q~ezcxOUhyRci4k5DXjv1nBCk~2OUMlFba37",

  // clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID,
  // clientSecret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,

  // secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
