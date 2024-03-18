"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import search from "../../components/js/searchPost.js";

export default function Search() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const getPosts = async () => {
    const res = await axios.get("/api/general");
    setPosts(res.data.posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const pattern = event.target[0].value;
    setSearchResults(search(posts, pattern));
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Results</h2>
          {searchResults.map((t) => (
            <div key={t.item._id}>
              <h3>{t.item.title}</h3>
              <p>{t.item.username}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
