"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import Image from "next/image";

const UserProfile = () => {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const userId = params?.id;
  
  const [user, setUser] = useState({
    username: "",
    email: "",
    image: "",
    _id: ""
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        // First fetch the user's posts
        let url = `/api/users/${userId}/posts`;
        if (tagFilter) {
          url = `/api/prompt?tag=${encodeURIComponent(tagFilter)}`;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        
        setPosts(data || []);

        // Set user info from the first post's creator
        if (!tagFilter && data.length > 0 && data[0].creator) {
          const creator = data[0].creator;
          setUser({
            username: creator.username || "",
            email: creator.email || "",
            image: creator.image || "",
            _id: creator._id || ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId, tagFilter]);

  const handleTagClick = (tag) => {
    setTagFilter(tag);
  };

  // Reset tag filter and return to user's posts
  const handleResetFilter = () => {
    setTagFilter("");
  };

  // When showing filtered posts by tag, show unique users
  const displayPosts = tagFilter
    ? Array.from(
        new Map(
          posts.map((p) => [p.creator._id, p])
        ).values()
      )
    : posts;

  if (isLoading) {
    return (
      <div className="w-full flex-center">
        <Image
          src="/assets/icons/loader.svg"
          width={50}
          height={50}
          alt="loading"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <section className="w-full">
      <Profile
        name={tagFilter ? `Posts with #${tagFilter}` : user.username}
        desc={
          tagFilter
            ? <span>
                Showing posts tagged with #{tagFilter}.{" "}
                <button 
                  className="text-blue-500 hover:underline"
                  onClick={handleResetFilter}
                >
                  Clear filter
                </button>
              </span>
            : `Welcome to ${user.username}'s profile page. Explore their prompts and creativity!`
        }
        data={displayPosts}
        handleEdit={null}
        handleDelete={null}
        handleTagClick={handleTagClick}
      />

      {!posts.length && !isLoading && (
        <div className="mt-10 text-center text-gray-600">
          {tagFilter 
            ? `No posts found with tag #${tagFilter}`
            : "This user hasn't created any prompts yet."}
        </div>
      )}
    </section>
  );
};

export default UserProfile;