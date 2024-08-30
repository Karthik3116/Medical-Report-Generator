import React from "react";
// import vg from "../assets/singletire.png";
import { Link } from "react-router-dom";
import "../styles/home.scss"
const Home = () => {
  return (
    <div className="hero">
      <div className="home" id="Home">
        <main>
          <h1>InsightXray</h1>
          <p>Medical Image Interpretation Redefined with Machine Learning</p>
          <br />
          <Link id="guestredirect" to={"/mri"}>
            Scan Chest X-ray
          </Link>

        </main>
      </div>
      <div className="home2">
        {/* <img src={vg} alt="Graphics" /> */}
        <div>
          {/* <h1></h1> */}
          <p>At InsightXray, we're dedicated to revolutionizing radiology with AI-powered medical image interpretation. Our mission is to assist radiologists in diagnosing conditions more quickly and accurately, ultimately improving patient outcomes.
</p>
        </div>
      </div>
    </div>
  );
};

export default Home;