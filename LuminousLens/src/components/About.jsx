import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container" id="about">
      <div className="about-header">
        <h1>About Luminious</h1>
        <p className="about-subtitle">Discover the story behind the gallery</p>
      </div>
      <div className="about-content">
        <div className="about-image">
          <img src="https://via.placeholder.com/300" alt="About Me" />
        </div>
        <div className="about-text">
          <h2>Hi, I'm User Sharma</h2>
          <p>
            I'm a passionate photographer and artist, driven by a desire to
            capture the beauty of the world around us. My gallery showcases a
            collection of moments and stories that I've captured through my
            lens. From serene landscapes to vibrant urban life, each photo
            represents a unique perspective.
          </p>
          <h2>LuminousLens</h2>
          <p>
            LuminousLens is your go-to destination for captivating photography and visual storytelling. Whether you're looking for stunning portraits, breathtaking landscapes, or creative photo essays, LuminousLens offers a curated collection of high-quality images that inspire and amaze. Explore our gallery, learn from our tips and tutorials, and get inspired by the art of photography.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
