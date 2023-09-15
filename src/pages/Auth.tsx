import { useState } from "react";
import SignInForm from "../components/SignIn";
import SignUpForm from "../components/SignUp";

export default function Auth() {
  const [type, setType] = useState("signIn");
  const handleOnClick = () => {
    if ("signIn" === type) {
      setType("signUp");
    } else {
      setType("signIn");
    }
  };
  return (
    <div className="container form-container">
      <div className={""}>{type === "signIn" ? <SignInForm /> : <SignUpForm />}</div>
      <div className="form-toggle">
        <p>{type === "signIn" ? "Create Account. " : "Already have an account ? "}</p>
        <button onClick={handleOnClick}>{type === "signIn" ? "here" : "Log in"}</button>
      </div>
    </div>
  );
}
