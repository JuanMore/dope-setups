import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from '../firebase.config'
import { toast } from "react-toastify"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Spinner from "../Components/UI/Spinner"

function Categorize({setup, id}) {
    const [setups, setSetups] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedSetup, setLastFetchedSetup] = useState(null)

  
    const params = useParams()

    useEffect(() => {
        // function fetchListings
        const fetchSetups = async () => {
            try {
                // Get reference
                const setupsRef = collection(db, 'setups')

                // Create a query
                // check url for query string
                const q = query(setupsRef, where('type', '==', params.categoryName),
                    // set specifications
                    orderBy('timestamp', 'desc'), limit(10))
                
                // Execute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedSetup(lastVisible)

                const setups = []

                querySnap.forEach((doc) => {
                    return setups.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setSetups(setups)
                // set to false after we get the data 
                setLoading(false)
            } catch (error) {
                toast.error('Could not retrieve data')
            }
        }

        fetchSetups()
    }, [params.categoryName])

    // pagination/load more setups
  const fetchMoreSetups = async () => {
    try {
      // get a reference 
      const setupsRef = collection(db, 'setups')

      // Create a query
     // set specifications
    // check url for query string - 
        const q = query(setupsRef,
            orderBy('timestamp', 'desc'),
            where('type', '==',
            params.categoryName),
            startAfter(lastFetchedSetup), limit(10))

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
      toast.error('No more setups found')
    }
  }


  return (
    <div className="category">
          <header>
              <p className="pageHeader">
                  {params.categoryName.charAt(0).toUpperCase() + params.categoryName.slice(1)}
              </p>
          </header>
          {
              loading ? < Spinner /> : setups && setups.length > 0 ? (
                  <main>
                      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 1000: 3 }}>
                
                          <Masonry columnsCount={4} gutter="5px">
                              {setups.map((item) => (
                                 <><div className="img-wrapper">
                                      {/* {`/category/${setup.type}/${id}`} */}
                                      <Link to={`/category/${item.data.type}/${item.id}`}>
                                          <img
                                              key={item.id}
                                              className="setup-img-home"
                                              src={item.data.imgUrls[0]}
                                              alt={`${item.data.type} setup`}
                                              style={{
                                                  width: "100%", height: "300px", display: "block", backgroundSize: "cover",
                                                  backgroundPosition: "center", backgroundRepeat: "no-repeat"
                                              }}
                                          />
                                      </Link>
                                      <div className="btn-wrapper">
                                        </div>
                                        <p className="img-title-1">{item.data.name}</p>
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
              ) : <p>No setups to display for '{params.categoryName}'</p>
              }
    </div>
  )
}

export default Categorize