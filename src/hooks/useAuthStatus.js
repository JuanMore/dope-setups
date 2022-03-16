import { useEffect, useState, useRef } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    // set state to check auth status
    const [checkingStatus, setCheckingStatus] = useState(true)
    
    // set isMounted to useRef(true) - to fix memory leak issue
    const isMounted = useRef(true)

    useEffect(() => {

        if (isMounted) {
            const auth = getAuth()

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setLoggedIn(true)
                }
                setCheckingStatus(false)
            })
        }

        // clean up memory leak
        return () => {
            isMounted.current = false
         }
    }, [isMounted])
  return {loggedIn, checkingStatus}
}

export default useAuthStatus