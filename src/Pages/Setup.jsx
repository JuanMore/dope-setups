import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase.config"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Spinner from "../Components/UI/Spinner"
import {
  FaShareAlt,
  FaChair,
  FaDesktop,
  FaPen,
  FaToolbox,
  FaDollarSign,
  FaFire,
  FaKeyboard,
  FaMouse,
  FaMicrophone
} from "react-icons/fa"
import { GrMonitor } from "react-icons/gr";
import { GiDesk, GiOfficeChair } from "react-icons/gi";
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
        console.log(docSnap.data())
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
                        <td>{setup.name}</td>
                        <td><FaFire /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.desk}</td>
                        <td><GiDesk size={20} /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.computer}</td>
                        <td><FaDesktop /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.keyboard}</td>
                        <td><FaKeyboard /></td>
                    </tr>
                    <tr class="border-prop">
                      <td>{setup.mouse}</td>
                      <td><FaMouse /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.microphone}</td>
                        <td><FaMicrophone /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.monitor}</td>
                        <td><GrMonitor /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.chair}</td>
                        <td><GiOfficeChair size={20} /></td>
                    </tr>
                    <tr class="border-prop">
                        <td>{setup.extraAccessories}</td>
                        <td><FaToolbox /></td>
                    </tr>
                    <tr class="border-prop">
                       <td>Estimated Cost</td>
                      <td>${setup.totalCost}</td>
                    </tr>
                    
                </tbody>
                </table>
        
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
      </main>
  )
}

export default Setup