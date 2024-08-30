import React from "react";
import "../styles/footer.scss"

const Footer = () => {
  return (
      <footer className="myfooter">
        <div id="footerbrand">
          <h1>InsightXray</h1>
          <p>@All Rights are reserved</p>
        </div>
        <div id="contactfooter">
            <h5>Contact Us</h5>
            <div>
                <a href="https://github.com/RajeshTanguturi/TiresOnHighways" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://twitter.com/RajeshTang75222" target="_blank" rel="noreferrer">Twitter</a>
                <a href="https://www.instagram.com/rajesh_tanguturi_/" target="_blank" rel="noreferrer">Instagram</a>
            </div>
        </div>
      </footer>
  );
};

export default Footer;