import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Spinner from "../Components/UI/Spinner"
import { FaShareAlt } from "react-icons/fa"
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg"



function Setup() {
  const [setup, setSetup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchSetup = async () => {
      // get doc reference
      const docRef = doc(db,'setups', params.setupId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setSetup(docSnap.data())
        setLoading(false)
      }
    }
    fetchSetup()
  }, [navigate, params.setupId])

  if (loading) {
    return <Spinner />
  }

  return (
    <main>
      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(() => {
          shareLinkCopied(false)
        }, 2000)
    }}>
          <FaShareAlt />
        </div>
    <div className="display-setup">
      <div className="slider">
          <AliceCarousel
            infinite
            touchTracking={true}
            autoPlay={true}
            fadeOutAnimation={true}
            mouseTrackingEnabled={true}
            disableAutoPlayOnAction={true}
            autoPlay autoPlayInterval="5000">
      {setup.imgUrls.map((url, index) => (
        <img src={setup.imgUrls[index]} 
          className="sliderimg" />
        ))}
          </AliceCarousel>
        </div>

        <table>
                <thead>
                    <tr>
                        <th>Setup Details</th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="border-prop">
                        <td>Ear Clean</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Teeth Brushing & Breath Spray</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Anal Gland Expression</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Dematt/Brush-Out</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                      <td>Nail Clip</td>
                      <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Nail Grind (With Dremel)</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Sanitary Trim</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Eye Area Trim</td>
                        <td></td>
                    </tr>
                    <tr class="border-prop">
                        <td>Paw Pads Shaved  Feet Trimmed</td>
                        <td>$20</td>
                    </tr>
                    <tr class="border-prop">
                        <td>Full Face Trim</td>
                        <td>$15-$20</td>
                    </tr>
                    <tr class="border-prop">
                        <td> Combine </td>
                            <td>$40</td>
                    </tr>
                    
                </tbody>
                </table>
        
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
      </main>
  )
}

export default Setup