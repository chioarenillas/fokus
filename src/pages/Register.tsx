import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      navigate("/app", { replace: true });
    } catch (err: any) {
      let message = "Something went wrong while creating your account";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use";
          break;

        case "auth/invalid-email":
          message = "The email address is not valid";
          break;

        case "auth/weak-password":
          message = "Password should be at least 6 characters";
          break;

        case "auth/operation-not-allowed":
          message = "Email/password accounts are not enabled";
          break;

        default:
          message = "Unexpected error. Please try again";
      }

      setError(message);
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="login-container">
      <h1>Create account</h1>

      {error && <h3 className="login-first">{error} </h3>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}
