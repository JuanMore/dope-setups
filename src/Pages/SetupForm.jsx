import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase.config'
import {v4 as uuidv4} from "uuid"
import { useNavigate } from 'react-router-dom'
import Spinner from "../Components/UI/Spinner"
import { toast } from "react-toastify"
function SetupForm() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData ] = useState({
        type: 'gaming',
        name: '',
        totalCost: 3000,
        chair: '',
        computer: '',
        desk: '',
        extraAccessories: '',
        headset: '',
        keyboard: '',
        microphone: '',
        monitor: '',
        mouse: '',
        images: {},
    })

    // destruct formData
    const { type,
        name,
    totalCost,
    chair,
    computer,
    desk,
    extraAccessories,
    headset,
    keyboard,
    microphone,
    monitor,
    mouse,
    images} = formData

    // init variables
    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {

        // fix memory leak
        if (isMounted) {
            // add user to state
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/login')
                }
            })
        }

        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    // create onSubmit
    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        
        if (images.length > 6) {
            setLoading(false)
            toast.error("Max 6 Images")
            return
        }
        
        // Store images in Firebase
        const storeImage = async (image) => {
            const uuid = uuidv4()
            // create a promise
            return new Promise((resolve, reject) => {
                const storage = getStorage()
                const fileName = `${auth.currentUser.uid}-${image.name}-${uuid}`

                const storageRef = ref(storage, 'images/' + fileName)

                // upload task
                const uploadTask = uploadBytesResumable(storageRef, image)
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                      const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      console.log('Upload is ' + progress + '% done')
                      switch (snapshot.state) {
                        case 'paused':
                          console.log('Upload is paused')
                          break
                        case 'running':
                          console.log('Upload is running')
                          break
                        default:
                          break
                      }
                    },
                    (error) => {
                        // reject from our promise if error/fail
                      reject(error)
                    },
                    () => {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                          // resolve from promise if successul
                        resolve(downloadURL)
                      })
                    }
                  )
            })
        }

        const imgUrls = await Promise.all(
            // spread images and map through
            // map takes in image and sets storeImage to each new image
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false)
            toast.error("Images failed to upload. Ensure image(s) size does not exceed 2Mb.")
            return 
        })

        const submitFormCopy = {
            ...formData,
            imgUrls,
            timestamp: serverTimestamp()
        }

        delete submitFormCopy.images
        
        const docRef = await addDoc(collection(db, 'setups'),
            submitFormCopy)
        setLoading(false)
        toast.success("Setup successfully uploaded!")
        navigate(`/category/${submitFormCopy.type}/${docRef.id}`)

        setLoading(false)
    }

    const onMutate = e => {
        let boolean = null

        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }

        // Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }))
        }

        // Text or booleans/numbers
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                // if value on left is null then use right
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
    }

    if (loading) {
        return <Spinner />
    }
  return (
    <div className="profile">
          <header>
              <p className="pageHeader">Post your Dope Setup</p>
          </header>

          <main>
              <form onSubmit={onSubmit}>
                  <label className="formLabel">Gaming / Programming / Security / Other</label>
                  <div className="formButtons">
                      <button type="button" className={type === 'gaming' ? 'formButtonActive' :
                          'formButton'}
                          id="type"
                          value='gaming'
                          onClick={onMutate}
                      >Gaming</button>
                       <button type="button" className={type === 'programming' ? 'formButtonActive' :
                          'formButton'}
                          id="type"
                          value='programming'
                          onClick={onMutate}
                      >Programming</button>
                      <button type="button" className={type === 'security' ? 'formButtonActive' :
                          'formButton'}
                          id="type"
                          value='security'
                          onClick={onMutate}
                      >Security</button>
                      <button type="button" className={type === 'other' ? 'formButtonActive' :
                          'formButton'}
                          id="type"
                          value='other'
                          onClick={onMutate}
                      >Other</button>
                  </div>
                  <div className="flex-container">

                  <div className="flex-1">
                  <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />

                  <label className='formLabel'>Desk</label>
          <input
            className='formInputName'
            type='text'
            id='desk'
            value={desk}
            onChange={onMutate}
            maxLength='32'
            minLength='5'
            required
                  />
                  <label className='formLabel'>Computer</label>
          <input
            className='formInputName'
            type='text'
            id='computer'
            value={computer}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                  <label className='formLabel'>Chair</label>
          <input
            className='formInputName'
            type='text'
            id='chair'
            value={chair}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                  <label className='formLabel'>Monitor</label>
          <input
            className='formInputName'
            type='text'
            id='monitor'
            value={monitor}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                       <label className='formLabel'>Keyboard</label>
          <input
            className='formInputName'
            type='text'
            id='keyboard'
            value={keyboard}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                  </div>
                  <div className="flex-2">
                  <label className='formLabel'>Headset</label>
          <input
            className='formInputName'
            type='text'
            id='headset'
            value={headset}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                         <label className='formLabel'>Microphone</label>
          <input
            className='formInputName'
            type='text'
            id='microphone'
            value={microphone}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                         <label className='formLabel'>Mouse</label>
          <input
            className='formInputName'
            type='text'
            id='mouse'
            value={mouse}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                         <label className='formLabel'>Accessories</label>
          <input
            className='formInputName'
            type='text'
            id='extraAccessories'
            value={extraAccessories}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
                  />
                  <label className='formLabel'>Total Cost</label>
                  <div className="formPriceDiv">
                  <input
                        className='formInputSmall'
                        type='number'
                        id='totalCost'
                        value={totalCost}
                        onChange={onMutate}
                        maxLength='100000000'
                        minLength='50'
                        required
                        />
                  </div>

                  <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg,.HEIC'
            multiple
            required
          />
                </div>
                  </div>
          <button type='submit' className='primaryButton setupFormButton'>
            Upload to DopeSetups
          </button>
         
              </form>
          </main>
          </div>
  )
}

export default SetupForm