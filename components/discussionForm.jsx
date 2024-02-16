"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Nav from "@/app/(components)/Nav";
import styles from "@/app/src/discussion.css";

function DiscussionForm({ admin, username }) {
  const [mainTopics, setMainTopics] = useState([]);
  const [navVisible, setNavVisible] = useState(false);
  const [subTopics, setSubTopics] = useState([]);
  const [mainTopic, setMainTopic] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [error, setError] = useState(false);

  const getTopics = async () => {
    try {
      setTopicLoading(true);
      const res = await axios.get("/api/fetchTopics");
      setMainTopics(res.data.mainTopics);
      setSubTopics(res.data.subTopics);
      setTopicLoading(false);
    } catch (error) {
      setTopicLoading(false);
      setError(true);
      console.log("Error loading topics", error);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    if (mainTopics.length > 0) {
      const randomIndex = Math.floor(Math.random() * mainTopics.length);
      setMainTopic(mainTopics[randomIndex]);
    }
  }, [mainTopics]);

  const handleNav = () => {
    setNavVisible(!navVisible);
  };

  return (
    <>
      <title>{mainTopic ? mainTopic.title : "Discussion"}</title>
      <top className="discussionTopBar">
        <Link href="intro" className="toIntro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon"
            width={50}
            height={50}
            viewBox="0 0 512 512"
          >
            <path
              d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z"
              fill="none"
              stroke="wheat"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11"
              fill="none"
              stroke="wheat"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="32"
            />
          </svg>
          <span className="intro">Oasis</span>
        </Link>
        <button className="menuBtn" onClick={handleNav}>
          <svg
            fill="none"
            width="100%"
            height="100%"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"
            />
          </svg>
        </button>
        {mainTopic && <h1 className="discussion">{mainTopic.title}</h1>}
      </top>
      {navVisible && (
        <div className="nav">
          <Nav />
        </div>
      )}
    </>
  );
}

export default DiscussionForm;
