import "./Login.css"
import { useState, type FormEvent, type ChangeEvent } from "react"
import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"

type FormData = {
  email: string
  password: string
}

export default function Register(): React.JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  })

  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<"idle" | "submitting">("idle")

  const navigate = useNavigate()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setStatus("submitting")
    setError(null)

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      navigate("/host", { replace: true })
    } catch (err: any) {
      let message = "Something went wrong while creating your account"

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "This email is already in use"
          break

        case "auth/invalid-email":
          message = "The email address is not valid"
          break

        case "auth/weak-password":
          message = "Password should be at least 6 characters"
          break

        default:
          message = "Unexpected error. Please try again"
      }

      setError(message)
    } finally {
      setStatus("idle")
    }
  }

  return (
    <div className="loginContainer">

      <div className="loginCard">

        {/* HEADER */}
        <div className="loginCardHeader">
          <h2>Create your account</h2>
        </div>

        {/* ERROR */}
        {error && (
          <p className="login-first">
            {error}
          </p>
        )}

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="loginForm"
        >

          <div className="formGroup">
            <label>Email</label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="formGroup">
            <label>Password</label>

            <input
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={status === "submitting"}
          >
            {status === "submitting"
              ? "Creating account..."
              : "Create account"}
          </button>

        </form>

        <div className="loginSignup">

          <p>
            Already have an account?
          </p>

          <Link
            to="/login"
            className="registerLink"
          >
            Sign in
          </Link>

        </div>

      </div>

    </div>
  )
}