import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function NavLinks() {
    return (
        <ul className="nav-list">
            <h1 className="logo" alt=''>Dope<span className="logo-color">Setups</span></h1>

        <li className="nav-list-item"><Link to="/" className="nav-link">Home</Link></li>
        <li className="nav-list-item"><Link to="/about" className="nav-link">About</Link></li>
        <li className="nav-list-item"><Link to="/explore-setups" className="nav-link">Categories</Link></li>
        <li className="nav-list-item"><Link to="/profile" className="nav-link">Account</Link></li>
        <li className="nav-list-item"><Link to="/login" className="nav-link">Login</Link></li>  
        <li className="nav-list-item"><Link to="/register" className="nav-link btn-login">Register</Link></li>

            
            <ul className="nav-list-social">
                <li className="nav-social-item"><a href="https://github.com/JuanMore" target="_blank" rel="noreferrer" className="nav-link">
                    <FaGithub size={25} /></a>
                </li>
                <li className="nav-social-item"><a href="https://twitter.com/moreno_dev" target="_blank" rel="noreferrer" className="nav-link">
                    <FaTwitter size={25} /></a>
                </li>
                <li className="nav-social-item"><a href="https://www.linkedin.com/in/juan-moreno-29b913123/" target="_blank" rel="noreferrer" className="nav-link">
                    <FaLinkedin size={25} /></a>
                </li>
            </ul>
    </ul>
    )
}

export default NavLinks
