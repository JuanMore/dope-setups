import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import {FaArrowRight} from 'react-icons/fa'


function ForgotPassword() {
  const [email, setEmail] = useState('')
  // define onChange function
  const onChange = e => {
    setEmail(e.target.value)
    setEmail.clear()
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // create auth variable
      const auth = getAuth()
      // returns a promise
      await sendPasswordResetEmail(auth, email)
      toast.success("Password reset email sent.")
    } catch (error) {
      toast.error("Could not send reset email.")
    }

  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">
          Forgot Password
        </p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink"
            to="/login">
            Sign In
          </Link>
          <div className="signInBar">
            <div className="signInText">
              Send reset link
            </div>
            <button className="signInButton">
              <FaArrowRight color="#fff" />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword