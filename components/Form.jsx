import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, sumbited, handleSubmit }) => {
  return (
    <section className="w-max-full w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue-gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>
      <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism " onSubmit={handleSubmit}>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write  your prompt here..."
            className="form_textarea"
            required
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {"   "}
            <span className="font-normal">
              #Product , #WebDevelopment , #Project
            </span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          ></textarea>
        </label>

        <div className="flex-between mx-3 mb-5 gap-4">
          <button
            disabled={sumbited}
            type="submit"
            className="bg-primary-orange rounded-full text-white font-bold px-5 py-1.5 hover:bg-primary-orange/80"
          >
            {sumbited? `${type}...`:type}
          </button>
          <Link href="/" className="text-gray-500 text-sm hover:text-gray-700">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Form;
