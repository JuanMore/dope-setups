import NavLinks from "./NavLinks"
import { useState } from 'react'
function Navbar() {
	const [open, setOpen] = useState(false)

    return (
		<nav className={`header__nav navbar ${open ? "toggle" : ""}`}>
		<a className="toggle-menu" onClick={() => setOpen(!open)}>
			<div className="line line1"></div>
			<div className="line line2"></div>
			<div className="line line3"></div>
			</a>
			{open && < NavLinks /> }
		
	</nav>
    )
}

export default Navbar
