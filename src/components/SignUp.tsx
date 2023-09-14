import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
//component
function SignUpForm() {
  const { signUp } = useAuth()!;
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    const { email, password, confirmPassword } = state;
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      navigate("/");
    } catch (error: any) {
      setError("Failed to create user :" + error.message);
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
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" />
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button disabled={loading}>{loading ? "Loading... " : "Sign Up"}</button>
        {error && <span style={{ color: "red" }}>{"Error :" + error}</span>}
      </form>
    </div>
  );
}

export default SignUpForm;
