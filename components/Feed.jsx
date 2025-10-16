"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import useDebounce from "../hooks/useDebounce";


const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post) => (
      <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
      />
    ))}
  </div>
);


const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const debouncedSearch = useDebounce(searchText, 300);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data || []);
      setFiltered(data || []);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const q = (debouncedSearch || "").trim().toLowerCase();
    if (!q) {
      setFiltered(posts);
      return;
    }
    setFiltered(
      posts.filter((p) => {
        const prompt = (p.prompt || "").toLowerCase();
        const tag = (p.tag || "").toLowerCase();
        const username = (
          (p.creator && (p.creator.username || p.creator.name)) ||
          ""
        ).toLowerCase();
        return prompt.includes(q) || tag.includes(q) || username.includes(q);
      })
    );
  }, [debouncedSearch, posts]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for a tag, prompt or username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filtered} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
