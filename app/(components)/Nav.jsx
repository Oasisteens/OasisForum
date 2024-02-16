"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "../src/nav.css";

const Nav = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [lift, setLift] = useState(false);

  return (
    <nav className="dash">
      <div className="navContainer">
        <div className="navDblock">
          <Link href="/profile" className="icon">
            <Image
              src="/person-circle-outline.svg"
              width="60"
              height="60"
              alt="person"
            />
          </Link>
        </div>
        <div className="navDblock">
          <div
            className={`icon icon-2 ${activeIcon === "icon-2" && lift ? "lift" : ""}`}
          >
            <Image
              src="/earth-outline.svg"
              width="40"
              height="40"
              alt="earth"
            />
          </div>
          <li className="nav">
            <Link
              className="channel"
              onMouseEnter={() => {
                setActiveIcon("icon-2");
                setLift(true);
              }}
              onMouseLeave={() => {
                setActiveIcon(null);
                setLift(false);
              }}
              href="/general"
            >
              General
            </Link>
          </li>
        </div>
        <div className="navDblock">
          <div
            className={`icon icon-3 ${activeIcon === "icon-3" && lift ? "lift" : ""}`}
          >
            <Image
              src="/chatbox-outline.svg"
              width="40"
              height="40"
              alt="chatbox"
            />
          </div>
          <li className="nav">
            <Link
              className="channel"
              onMouseEnter={() => {
                setActiveIcon("icon-3");
                setLift(true);
              }}
              onMouseLeave={() => {
                setActiveIcon(null);
                setLift(false);
              }}
              href="/news"
            >
              News
            </Link>
          </li>
        </div>
        <div className="navDblock">
          <div
            className={`icon icon-4 ${activeIcon === "icon-4" && lift ? "lift" : ""}`}
          >
            <Image src="/heart.svg" width="40" height="40" alt="heart" />
          </div>
          <li className="nav">
            <Link
              className="channel"
              onMouseEnter={() => {
                setActiveIcon("icon-4");
                setLift(true);
              }}
              onMouseLeave={() => {
                setActiveIcon(null);
                setLift(false);
              }}
              href="/confession"
            >
              Confession
            </Link>
          </li>
        </div>
        <div className="navDblock">
          <div
            className={`icon icon-5 ${activeIcon === "icon-5" && lift ? "lift" : ""}`}
          >
            <Image src="/book-outline.svg" width="40" height="40" alt="book" />
          </div>
          <li className="nav">
            <Link
              className="channel"
              onMouseEnter={() => {
                setActiveIcon("icon-5");
                setLift(true);
              }}
              onMouseLeave={() => {
                setActiveIcon(null);
                setLift(false);
              }}
              href="/discussion"
            >
              Discussion
            </Link>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
