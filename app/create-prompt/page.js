"use client";

import Form from "@components/Form";
import {toast} from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePromptClient = () => {
  const {data:session}=useSession(false);
  const router =useRouter();
  const [sumbited, setSumbited] = useState();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
 
  const createPrompter = async (e) => {
    e.preventDefault();
    setSumbited(true);
    try {
      const response = await fetch("/api/prompt/new",{
        method:"POST",
        body:JSON.stringify({
          prompt:post.prompt,
          userId:session?.user.id,
          tag:post.tag,
        })
      })
      if(response.ok){
        router.push('/');
      }
    } catch (error) {
      console.log(error)
    }finally{
      setSumbited(false);
      toast.success("prompt is create successfully")
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      sumbited={sumbited}
      handleSubmit={createPrompter}
    />
  );
};

export default CreatePromptClient;
