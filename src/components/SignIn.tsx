import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
function SignInForm() {
  const { logIn } = useAuth()!;
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const { email, password } = state;
    try {
      setError("");
      setLoading(true);
      await logIn(email, password);
      navigate("/");
    } catch (error: any) {
      setError("Failed to create user :" + error.message);
    }
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your account</span>
        <input type="email" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
        <Link to={"/forgot-password"}>Forgot your password?</Link>
        <button disabled={loading}>{loading ? "Signing You In..." : "Sign In"}</button>
        {error && <span style={{ color: "darkred" }}>{"Error :" + error}</span>}
      </form>
    </div>
  );
}

export default SignInForm;
