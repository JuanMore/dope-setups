
import { useState } from 'react'
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { FaArrowRight, FaLowVision } from 'react-icons/fa'
import OAuth from '../Components/OAuth'

function Login() {
  // show/hide password
  const [showPassword, SetShowPassword] = useState(false)
  // form data object for input fields
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // to use email/password destruct from formData
  const {email, password} = formData

  // init navigate
  const navigate = useNavigate()

  // define onChange function
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,

    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
       // init auth
      const auth = getAuth()

      const userCred = await signInWithEmailAndPassword(auth, email, password)

      if (userCred.user) {
        navigate('/')
        toast.success("Welcome back!")
    }

    } catch (error) {
      toast.error('Wrong credentials, please try again.',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }

  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader"></p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input type="email" className="emailInput" placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'}
                className="passwordInput" placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />

              <FaLowVision color="gray" className="showPassword"
                onClick={() => SetShowPassword((prevState) => 
                  !prevState)}/>
                
            </div>
            <Link to="/forgot-password"
            className="forgotPasswordLink"
            >
              Forgot Password
            </Link>
            <div className="signInBar">
              <p className="signInText">
                Sign In
              </p>
              <button className="signInButton">
                <FaArrowRight color="#fff" />
              </button>
            </div>
          </form>
          <OAuth />

          <Link to="/register" className="registerLink">
            Sign Up Instead
          </Link>
        </main>
      </div>
      </>
  )
}

export default Login