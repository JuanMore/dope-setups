

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { db } from "../firebase.config"
import OAuth from '../Components/OAuth'
import {setDoc, doc, serverTimestamp} from "firebase/firestore"
import {FaArrowRight, FaLowVision} from 'react-icons/fa'

function Register() {
  // show/hide password
  const [showPassword, SetShowPassword] = useState(false)
  // form data object for input fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // to use email/password destruct from formData
  const {email, password, name} = formData

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
      const auth = getAuth()

      // call function stored to userCred 
      const userCred = await createUserWithEmailAndPassword(auth, email, password)

      // get user from userCred
      const user = userCred.user

      // update user name
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // define varibale formDataCopy
      const formDataDb = { ...formData }
      // deletes password before being sent to database
      delete formDataDb.password
      // add serverTimestamp to timestamp property
      formDataDb.timestamp = serverTimestamp()

      // set user to users collection
      await setDoc(doc(db, 'users', user.uid), formDataDb)
      
      // after sign up - redirect to home page
      navigate('/')
    } catch (error) {
      toast.error('An error occurred with registration.')
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
          <input type="text" className="nameInput" placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
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
            <div className="signUpBar">
              <p className="signUpText">
                Sign Up
              </p>
              <button className="signUpButton">
                <FaArrowRight color="#fff" />
              </button>
            </div>
          </form>
          <OAuth />

          <Link to="/login" className="registerLink">
            Login Instead
          </Link>
        </main>
      </div>
      </>
  )
}

export default Register