import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="container">
            <footer className="bg-dark text-white text-center text-lg-start mt-1">
                <div className="container p-4">
                    <div className="row">

                        {/* About Us */}
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">About Us</h5>
                            <p>
                                We build scalable, elegant solutions for modern businesses. Let's create something
                                amazing together.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Quick Links</h5>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <Link to="/twitter" className="text-white">
                                        <i className="bi bi-twitter-x"></i> Twitter
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/linkedin" className="text-white">
                                        <i className="bi bi-linkedin"></i> LinkedIn
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/facebook" className="text-white">
                                        <i className="bi bi-facebook"></i> Facebook
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/github" className="text-white">
                                        <i className="bi bi-github"></i> GitHub
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Contact</h5>
                            <p><i className="bi bi-envelope-at"></i> Email: logankenta254@gmail.com</p>
                            <p><i className="bi bi-telephone-outbound"></i> Phone: +254 701 465 128</p>
                            <p><i className="bi bi-geo-alt"></i> Nairobi, Kenya</p>
                        </div>
                    </div>
                </div>

                <div className="text-center p-3 bg-success">
                    © 2025 Aoyagi Cloud Tech Solutions. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

export default Footer;
