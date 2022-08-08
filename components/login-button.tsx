import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <>
      <h2>You are not Signed in</h2>
      <button onClick={() => signIn()}>Sign In</button>{" "}
    </>
  );
}
