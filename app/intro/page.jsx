"use client";
import SocialMedia from "../(icons)/SocialMedia";
import Chatbubbles from "../(icons)/ionIcons/Chatbubbles";
import AlertCircle from "../(icons)/ionIcons/AlertCircle";
import Construct from "../(icons)/ionIcons/Construct";
import LockClosed from "../(icons)/ionIcons/LockClosed";
import Megaphone from "../(icons)/ionIcons/Megaphone";
import People from "../(icons)/ionIcons/People";
import ShieldHalf from "../(icons)/ionIcons/ShieldHalf";
import styles from "../src/intro.css";
const Intro = () => {
  return (
    <>
      <title>Oasis</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <nav className="index">
        <div className="icon-container">
          <Chatbubbles />
        </div>
        <a className="webicon" href="intro">
          Oasis
        </a>
        <div className="gradient-text">
          <a className="channel c1" href="login">
            Login
          </a>
          <a className="channel c2" href="register">
            Register
          </a>
          <a className="channel c3" href="news">
            News
          </a>
          <a className="channel c4" href="contact">
            Contact
          </a>
        </div>
      </nav>
      <header>
        <h1 className="intro">Welcome to the Oasis!</h1>
        <hr />
        <p>
          Welcome to our forum website, the ultimate platform for engaging
          discussions and connecting with like-minded individuals. Whether
          you&apos;re seeking expert advice, sharing your experiences, or simply
          looking to expand your knowledge, our forum offers a vibrant community
          where you can ask questions, contribute insights, and immerse yourself
          in a diverse range of topics. Join us and be part of the conversation
          today!
        </p>
      </header>
      <section>
        <h1 className="intro">About Us</h1>
        <hr />
        <p>
          At Oasis, we believe in the power of connections and conversations. We
          have created a vibrant online forum where individuals from all walks
          of life can come together to discuss, share, and learn. Whether you
          are seeking knowledge, seeking support, or simply looking to engage in
          meaningful conversations, Oasis is here to provide a safe and
          welcoming space for you.
        </p>
        <div className="container">
          <div className="block">
            <div className="icon">
              <People />
            </div>
            <h3>Diverse Community</h3>
            <p>
              Celebrating diversity, embracing perspectives, valuing
              everyone&apos;s voice
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <Megaphone />
            </div>
            <h3>Engaging Discussions</h3>
            <p>
              Topics span tech, arts, sports, current events; engage with
              like-minded members
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <Construct />
            </div>
            <h3>Constructive Contributions</h3>
            <p>
              Contribute insight, share experiences, foster learning in
              constructive discussions
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <ShieldHalf />
            </div>
            <h3>No Spam or Self-Promotion</h3>
            <p>
              Avoid spam, excessive self-promo; share responsibly in designated
              areas
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <LockClosed />
            </div>
            <h3>Privacy and Confidentiality</h3>
            <p>
              Respect privacy, obtain consent before sharing personal or
              confidential content
            </p>
          </div>
          <div className="block">
            <div className="icon">
              <AlertCircle />
            </div>
            <h3>Reporting Issues</h3>
            <p>
              Report guideline violations or issues to moderators for a safe
              community
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <SocialMedia />
    </>
  );
};

export default Intro;
