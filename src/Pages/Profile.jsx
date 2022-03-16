import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { updateDoc, doc} from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth, updateProfile } from "firebase/auth"
import {toast} from "react-toastify"


function Profile() {
  const auth = getAuth()
  const [updateDetails, setUpdateDetails] = useState(false)
  const [formData, setFormData] = useState({
    // set to data from firebase
    name: auth.currentUser.displayName,
    email: auth.currentUser.email

  })

  // destructure name and email from formData
  const {name, email} = formData

  const navigate = useNavigate()

  // define function to logout user
  const onLogout = () => {
    auth.signOut()

    // navigate back to home
    navigate('/')
  }

  const onSubmit = async () => {
    // save updated account details to db
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
        toast.success("Account details updated.", {
          autoClose: 3000
        })
      }
    } catch (error) {
      toast.error("An error occured while updating account details")
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  return <div className="profile">
    <header className="profileHeader">
      <div className="pageHeader">
        My Profile
      </div>
    </header>
    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Account Details</p>
        <p className="changeAccountDetails" onClick={() => {
          updateDetails && onSubmit()
          setUpdateDetails((prevState) => !prevState)
        }}>
          {updateDetails ? 'Done' : 'Update'}
        </p>
      </div>
      <div className="profileCard">
        <form>
          <input type="text" id="name"
            className={!updateDetails ? 'profileName' :
              'profileNameActive'}
            disabled={!updateDetails}
            value={name}
            onChange={onChange}

          />
           <input type="text" id="name"
            className={!updateDetails ? 'profileEmail' :
              'profileEmailActive'}
            disabled={!updateDetails}
            value={email}
            onChange={onChange}

          />
        </form>
      </div>
    </main>
    <div className="logOutDiv">
    <button type="button" className="logOut" onClick={onLogout}>Log Out</button>
    </div>
  </div>
}

export default Profile