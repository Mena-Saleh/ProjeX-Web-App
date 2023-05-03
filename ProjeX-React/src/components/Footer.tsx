import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer>
            <h4>About Us</h4>
            <p>
                ProjeX is a simple project management system that aims to
                faciliate collaboration between members of a team on their
                projects.
            </p>
            <div className="icons">
                <a href="https://facebook.com">
                    <i className="fa fa-facebook"> </i>
                </a>
                <a href="https://twitter.com">
                    <i className="fa fa-twitter"> </i>
                </a>
                <a href="https://instagram.com">
                    <i className="fa fa-instagram"> </i>
                </a>
            </div>
            <p>
                Made with <i className="fa fa-heart-o"> </i> by Mena
            </p>
        </footer>
    );
};

export default Footer;
