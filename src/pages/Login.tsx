import { useState, type FormEvent, type ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  console.log(auth.currentUser);
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/host";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginFormData.email,
        loginFormData.password,
      );

      const user = userCredential.user;
      console.log(user);
      localStorage.setItem("loggedin", "true");

      navigate(from, { replace: true });
    } catch (err: any) {
      let message = "Login failed. Please try again";

      switch (err.code) {
        case "auth/user-not-found":
          message = "No account found with this email";
          break;

        case "auth/wrong-password":
          message = "Incorrect password";
          break;

        case "auth/invalid-email":
          message = "Invalid email address";
          break;

        case "auth/too-many-requests":
          message = "Too many attempts. Try again later";
          break;

        case "auth/invalid-credential":
          message = "Invalid email or password";
          break;

        default:
          message = "Unexpected error. Please try again";
      }

      setError(message);
    } finally {
      setStatus("idle");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-first">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error && <h3 className="login-first">{error}</h3>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address (try: user@user.com)"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password (try: user123456)"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p>Don't have an account? </p>
      <button>
        <a href="/register">Sign up</a>
      </button>
    </div>
  );
}
