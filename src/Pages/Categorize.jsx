import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from '../firebase.config'
import {toast} from "react-toastify"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Spinner from "../Components/UI/Spinner"

function Categorize({setup, id}) {
    const [setups, setSetups] = useState(null)
    const [loading, setLoading] = useState(true)
  
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

                const setups = []

                querySnap.forEach((doc) => {
                console.log(doc.data())

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
                                 <>
                                      {/* {`/category/${setup.type}/${id}`} */}
                                      <Link to={`category/${item.data.type}/${item.id}`}>
                                          <img
                                              className="setup-img-home"
                                              src={item.data.imgUrls[0]}
                                              alt={`${item.data.type} setup`}
                                              style={{
                                                  width: "100%", height: "300px", display: "block", backgroundSize: "cover",
                                                  backgroundPosition: "center", backgroundRepeat: "no-repeat"
                                              }}
                                          />
                                      </Link>
                                      </>
                              ))}
                          </Masonry>
                      </ResponsiveMasonry>
                  </main>
              ) : <p>No setups to display for '{params.categoryName}'</p>
              }
    </div>
  )
}

export default Categorize