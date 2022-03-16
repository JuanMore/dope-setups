import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from '../firebase.config'
import {toast} from "react-toastify"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Spinner from "../Components/UI/Spinner"


function Home() {
  const [setups, setSetups] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()
  
  // create useEffect
  useEffect(() => {
    const fetchSetups = async () => {
      try {
        // get a reference 
        const setupsRef = collection(db, 'setups')

        // create ,query
        const q = query(setupsRef, orderBy('timestamp', 'desc'), limit(10))

        // Execute query
        const querySnap = await getDocs(q)

        // loop through snapshot to retrieve data
        const setups = []
        querySnap.forEach((doc) => {
          return setups.push({
            id: doc.id,
            data: doc.data()
          })
          
        })

        // set useState to new setups array
        setSetups(setups)
        setLoading(false)

      } catch {
        toast.error('Could not retrieve data')
      }
    }

    fetchSetups()
  }, [])
  return (
    <div className="setups-home">
      <header>
        <p className="homeHeader">Latest setups...</p>
      </header>
   
        {/* Maybe a slider */}

        {loading ? (
          <Spinner />
      ) : setups && setups.length > 0 ? (
        <main>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 1000: 3 }}>
            
              <Masonry columnsCount={4} gutter="5px">
                {setups.map((item) => (
                  <div className="img-wrapper"
                  key={item.id}
                  >
                    {/* {`/category/${setup.type}/${id}`} */}
                  <Link to='/'>
                <img
                   className="setup-img-home"
                    src={item.data.imgUrls[0]}
                    alt= ""
                        style={{
                          width: "100%", height: "300px", display: "block", backgroundSize: "cover",
                          backgroundPosition: "center", backgroundRepeat: "no-repeat"}}
                          />
                        </Link>
                      </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </main>
            
          ) : (
              <p> No setups to display</p>
        )}
        {/* <div className="setups-grid">
          <Link to="/">
            <img
              src={setupImg}
              alt="setup"
              className="home-img"
            />
            </Link>
         
        </div> */}
    </div>
  )
}

export default Home