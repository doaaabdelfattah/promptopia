"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "../../components/Profile";

const UserProfile = () => {
  const { data: session } = useSession();
  // console.log("session: ", session);
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => post._id !== p._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name={session?.user.name}
      desc="welcome"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
