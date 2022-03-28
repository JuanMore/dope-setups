import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from '../firebase.config'
import {toast} from "react-toastify"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Spinner from "../Components/UI/Spinner"
import {FaChevronRight} from "react-icons/fa"


function Home() {
  const [setups, setSetups] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedSetup, setLastFetchedSetup] = useState(null)

  
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

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedSetup(lastVisible)

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

  // pagination/load more setups
  const fetchMoreSetups = async () => {
    try {
      // get a reference 
      const setupsRef = collection(db, 'setups')

      // create ,query
      const q = query(setupsRef,
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedSetup),
        limit(10))

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedSetup(lastVisible)

      // loop through snapshot to retrieve data
      const setups = []
      querySnap.forEach((doc) => {
        return setups.push({
          id: doc.id,
          data: doc.data()
        })
        
      })

      // set useState to previous state(setups) + more fetched setups to array
      setSetups((prevState) => [...prevState, ...setups])
      setLoading(false)

    } catch {
      toast.error('Could not retrieve data')
    }
  }

  return (
    <div className="setups-home">
   
        {loading ? (
          <Spinner />
      ) : setups && setups.length > 0 ? (
          <main>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 500: 2, 750: 3, 1000: 3 }}>
              <Masonry columnsCount={4} gutter="5px">
                {setups.map((item) => (
                  <><div className="img-wrapper"
                  >
                    {/* {`/category/${setup.type}/${id}`} */}
                    <Link to={`/category/${item.data.type}/${item.id}`}>
                      <img
                        key={item.id}
                        className="setup-img-home"
                        src={item.data.imgUrls[0]}
                        alt="setup"
                        style={{
                          width: "100%", height: "300px", display: "block", backgroundSize: "cover",
                          backgroundPosition: "center", backgroundRepeat: "no-repeat"
                        }} />
                    </Link>
                    <div className="btn-wrapper">
                    </div>
                    <p className="img-title">{item.data.name}</p>
                    <p className="img-description">{item.data.type}</p>
                    <Link className="more-like-this" to={`/category/${item.data.type}`}>More like this <FaChevronRight size={10} /> </Link>
                      </div>
                  </>
                ))}
              
            </Masonry>
            </ResponsiveMasonry>
            <br />
            <br />
            {lastFetchedSetup && (
              <p className="loadMore" onClick={fetchMoreSetups}>Load More</p>
            )}
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