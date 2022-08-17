import AzureADB2C from "next-auth/providers/azure-ad-b2c";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <>
      <h2>You are not Signed in</h2>
      <button onClick={() => signIn(AzureADB2C)}>Sign In</button>{" "}
    </>
  );
}
