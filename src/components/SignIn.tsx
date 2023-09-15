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
      setError("Failed to login :" + error.message);
    }
    setLoading(false);
    for (const key in state) {
      setState({
        ...state,
        [key]: "",
      });
    }
  };

  return (
    <form className="sign-in-container" onSubmit={handleOnSubmit}>
      <h1>Sign in</h1>
      <input type="email" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
      <Link to={"/forgot-password"}>Forgot your password?</Link>
      <button className="submit-btn" disabled={loading}>
        {loading ? "Signing You In..." : "Sign In"}
      </button>
      {error && <span style={{ color: "darkred" }}>{"Error :" + error}</span>}
    </form>
  );
}

export default SignInForm;
