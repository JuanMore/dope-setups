import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import {db} from "../firebase.config"
import { toast } from "react-toastify"
import googleIcon from "../assets/svg/googleIcon.svg"

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()
    const onGoogleClick = async() => {
        try {
            const auth = getAuth()
            // set provider
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            // get user from google sign in
            const user = result.user


            // set docRef to see if we have a reference to that document (aka: user) 
            // by checking id
            const docRef = doc(db, 'users', user.uid)
            // snapshot
            const docSnap = await getDoc(docRef)

            // if user doesn't exist - create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    // set timestamp from server
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error("Could not authorize with Google.")
        }
    }


    return <div className="socialLogin">
        <p>Sign {location.pathname === '/register' ? "up" : "in"} with</p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img className="socialIconImg" src={googleIcon} alt="Google" />
        </button>
  </div>
}

export default OAuth