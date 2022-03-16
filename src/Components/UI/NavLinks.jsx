import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function NavLinks() {
    return (
        <ul className="nav-list">
            <h1 className="logo" alt=''>Dope<span className="logo-color">Setups</span></h1>

        <li className="nav-list-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-list-item"><Link to="/about" className="nav-link">About</Link></li>
        <li className="nav-list-item"><Link to="/profile" className="nav-link">Account</Link></li>
        <li className="nav-list-item"><Link to="/login" className="nav-link">Login</Link></li>  
        <li className="nav-list-item"><Link to="/register" className="nav-link btn-login">Register</Link></li>

            
            <ul className="nav-list-social">
                <li className="nav-social-item"><Link to="/" className="nav-link">
                    <FaFacebook size={25} /></Link>
                </li>
                <li className="nav-social-item"><Link to="/" className="nav-link">
                    <FaTwitter size={25} /></Link>
                </li>
                <li className="nav-social-item"><Link to="/" className="nav-link">
                    <FaLinkedin size={25} /></Link>
                </li>
            </ul>
    </ul>
    )
}

export default NavLinks
