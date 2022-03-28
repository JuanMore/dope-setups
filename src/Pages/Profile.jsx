import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
  updateDoc, doc, collection,
  getDocs, query, where,
  orderBy, deleteDoc
} from "firebase/firestore"
import { db } from "../firebase.config"
import { getAuth, updateProfile } from "firebase/auth"
import { toast } from "react-toastify"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import {FaChevronRight, FaLaptop, FaTrash, FaEdit} from "react-icons/fa"


function Account() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [setups, setSetups] = useState(null)
  const [updateDetails, setUpdateDetails] = useState(false)
  const [formData, setFormData] = useState({
    // set to data from firebase
    name: auth.currentUser.displayName,
    email: auth.currentUser.email

  })

  // destructure name and email from formData
  const {name, email} = formData

  const navigate = useNavigate()

  // get setups that match user's
  useEffect(() => {
    const fetchUserSetups = async () => {
      const setupsRef = collection(db, 'setups')

      const q = query(
        setupsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let setups = []
      querySnap.forEach( doc => {
        return setups.push({
          id: doc,
          data: doc.data()
          })
      })

      setSetups(setups)
      console.log(setups)
      setLoading(false)
    }

     fetchUserSetups()
  }, [auth.currentUser.uid])

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

  // define ondelete func 
  const onDelete = async (setupId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'setups', setupId))
      // display updated setups after removing one
      const updatedSetups = setups.filter((setup) =>
        setup.id.id !== setupId)
      setSetups(updatedSetups)
      toast.success('Successfully deleted setup')
    }
  }

  // onEdit function
  const onEdit = (setupId) => navigate(`/edit-setup/${setupId}`)

  return <div className="account">
    <header className="acountHeader">
      <div className="pageHeader">
        My Profile
      </div>
    </header>
    <main>
      <div className="accountDetailsHeader">
        <p className="accountDetailsText">Account Details</p>
        <p className="changeAccountDetails" onClick={() => {
          updateDetails && onSubmit()
          setUpdateDetails((prevState) => !prevState)
        }}>
          {updateDetails ? 'Done' : 'Update'}
        </p>
      </div>
      <div className="accountCard">
        <form>
          <input type="text" id="name"
            className={!updateDetails ? 'accountName' :
              'accountNameActive'}
            disabled={!updateDetails}
            value={name}
            onChange={onChange}

          />
           <input type="text" id="name"
            className={!updateDetails ? 'accountEmail' :
              'accountEmailActive'}
            disabled={!updateDetails}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>
      <Link to="/setup-form" className="setupFormBtn">
        <FaLaptop />
        <p>Post your Workstation</p>
        <FaChevronRight />
          </Link>
    </main>
    <div className="logOutDiv">
    <button type="button" className="logOut" onClick={onLogout}>Log Out</button>
    </div>
    {!loading && setups?.length > 0 && (
      <>
       <main className="account-setup">
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 500: 2, 750: 2, 1000: 2 }}>
              <Masonry columnsCount={2} gutter="2px">
                {setups.map((item) => (
                  <><div className="img-wrapper">
                    {/* {`/category/${setup.type}/${id}`} */}
                    <Link to={`/category/${item.data.type}/${item.id.id}`}>
                      <img
                        key={item.id.id}
                        id={item.id.id}
                        className="setup-img-home"
                        src={item.data.imgUrls[0]}
                        alt="setup"
                        style={{
                          width: "100%", height: "300px", display: "block", backgroundSize: "cover",
                          backgroundPosition: "center", backgroundRepeat: "no-repeat"
                        }} />
                    </Link>
                     {/* If on delete display trash icon */}
                      {onDelete && (
                          <FaTrash className="trash"
                              onClick={ () => onDelete(item.id.id, item.data.name)}/>
                    )}
                    {onEdit && (
                      <FaEdit className="edit"
                        onClick={ () => onEdit(item.id.id)}/>
                    )}
                    <Link className="more-like-this" to={`/category/${item.data.type}`}>More like this <FaChevronRight size={10} /> </Link>
                  </div>                    
                  </>
                ))}
            </Masonry>
          </ResponsiveMasonry>
          </main>
      </>
    )}
  </div>
}

export default Account