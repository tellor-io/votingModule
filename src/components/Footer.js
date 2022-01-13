import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import { ReactComponent as Github } from "../assets/Github.svg";
import { ReactComponent as Twitter } from "../assets/Twitter.svg";
import { ReactComponent as Discord } from "../assets/Discord.svg";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__Left">
        <Link to="/" className="Footer__LogoContainer">
          <div>
            <span className="Footer__Logo">tellor</span>
          </div>
          <div className="Footer__Tagline">
            <span>unstoppable</span>
            <span>oracle</span>
          </div>
        </Link>
        <p>&copy; 2022 Tellor</p>
        <div className="Footer__SocialContainer">
          <a
            href="https://github.com/tellor-io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
          <a
            href="https://twitter.com/WeAreTellor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
          <a
            href="https://discord.com/invite/n7drGjh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Discord />
          </a>
        </div>
      </div>
      <div className="Footer__Right">
        <p>Links</p>
        <a
          href="http://tellor.io"
          alt="http://docs.tellor.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          tellor.io
        </a>
        <a
          href="http://docs.tellor.io"
          alt="http://docs.tellor.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          docs.tellor.io
        </a>
      </div>
    </div>
  );
};

export default Footer;
