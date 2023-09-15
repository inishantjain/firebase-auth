import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
function ResetPassword() {
  const [email, setEmail] = useState<string>("");
  const [isResetLinkSend, setIsResetLinkSend] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { resetPassword } = useAuth()!;
  const handleResetPassword = async () => {
    if (!email) return setError("Enter email address");
    try {
      setError("");
      await resetPassword(email);
      setIsResetLinkSend(true);
    } catch (error) {}
  };
  return (
    <div className="container form-container">
      <div className="resetPassword">
        <h1>Please Enter Your Email to Reset Your Password!</h1>
        <input
          placeholder="Enter You Email Here"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
        />
        {error && <span style={{ color: "honeydew" }}>{"Error :" + error}</span>}
        {isResetLinkSend && <span style={{ color: "whitesmoke" }}>{"Reset link has been sent to you email!"}</span>}
        <button className="submit-btn" onClick={handleResetPassword} disabled={isResetLinkSend}>
          {"Reset Password"}
        </button>
        <Link to={"/auth"}>Return to Login</Link>
      </div>
    </div>
  );
}

export default ResetPassword;
