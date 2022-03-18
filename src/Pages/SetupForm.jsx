import { useState, useEffect, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import Spinner from "../Components/UI/Spinner"
function SetupForm() {
    const [loading, setLaoding] = useState(false)
    const [formData, setFormData ] = useState({
        type: 'programming',
        name: 'Coder Coder',
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
    const onSubmit = e => {
        e.preventDefault()
    }

    // create onMutate
    const onMutate = () => {
        
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
                        value={`$${totalCost}`}
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
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton setupFormButton'>
            Upload to DopeSetups
          </button>
         
              </form>
          </main>
          </div>
  )
}

export default SetupForm