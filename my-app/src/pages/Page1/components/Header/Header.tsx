import Navbar from "../../../components/Navbar"

import './index.css'
const Header = () => {
    return (
        <div className="header1">
            {/*<div className="visa_label">
                <a href="/"><img className="visa_picture"
                    src="/front/public/visa_label_blue.png"/></a>
                <div className="visa_title">
                    <p>Визовый центр</p>
                    <p>РФ</p>
                </div>
            </div> */}     
            <div className="navbar-container"><Navbar/></div>
        </div>
    )
}

export default Header