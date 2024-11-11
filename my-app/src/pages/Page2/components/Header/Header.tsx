import Navbar2 from "../../../components/Navbar2"
import './index.css'
const Header = () => {
    return(
        <div className="header2">
        <div className="visa_label">
        <a href="/"><img className="visa_picture"
                                                   src="/visa_label_white.png"/></a>
            <div className="visa_title2">
                <p>Визовый</p>
                <p>центр</p>
                <p>РФ</p>
            </div>
        </div>
         <div className="navbar-container"><Navbar2/></div>
         </div>
    )
}

export default Header