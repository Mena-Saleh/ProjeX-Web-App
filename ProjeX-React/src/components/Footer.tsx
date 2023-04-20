import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer>
            Made with <FontAwesomeIcon icon={faHeart} className="footer-icon" />{" "}
            by Mena
        </footer>
    );
};

export default Footer;
