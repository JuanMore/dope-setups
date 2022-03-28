import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Spinner from "../Components/UI/Spinner"
import {
  FaShareAlt,
  FaDesktop,
  FaToolbox,
  FaFire,
  FaKeyboard,
  FaMouse,
  FaMicrophone
} from "react-icons/fa"
import { GrMonitor } from "react-icons/gr";
import { GiDesk, GiOfficeChair } from "react-icons/gi";



function Setup() {
  const [setup, setSetup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

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
            autoPlayInterval="5000">
      {setup.imgUrls.map((url, index) => (
        <img src={setup.imgUrls[index]} 
          className="sliderimg"
          alt="setup"
        />
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
                    <tr className="border-prop">
                        <td>{setup.name}</td>
                        <td><FaFire /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.desk}</td>
                        <td><GiDesk size={20} /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.computer}</td>
                        <td><FaDesktop /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.keyboard}</td>
                        <td><FaKeyboard /></td>
                    </tr>
                    <tr className="border-prop">
                      <td>{setup.mouse}</td>
                      <td><FaMouse /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.microphone}</td>
                        <td><FaMicrophone /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.monitor}</td>
                        <td><GrMonitor /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.chair}</td>
                        <td><GiOfficeChair size={20} /></td>
                    </tr>
                    <tr className="border-prop">
                        <td>{setup.extraAccessories}</td>
                        <td><FaToolbox /></td>
                    </tr>
                    <tr className="border-prop">
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