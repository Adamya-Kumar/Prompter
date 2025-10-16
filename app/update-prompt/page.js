"use client";

import Form from "@components/Form";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const serarchPrompt = useSearchParams();
  const promptId = serarchPrompt.get("id");
  const router = useRouter();
  const [sumbited, setSumbited] = useState();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompter = async (e) => {
    e.preventDefault();
    setSumbited(true);
    if (!promptId) return alert("Prompt Id is missing...");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSumbited(false);
      toast.success("prompt is update successfully");
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      sumbited={sumbited}
      handleSubmit={updatePrompter}
    />
  );
};

export default EditPrompt;
