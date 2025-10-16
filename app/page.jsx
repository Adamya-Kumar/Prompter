import Feed from "@components/Feed"
import { Toaster } from "react-hot-toast"

const page = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Toaster/>
      <h1 className="head_text text-center">Discover & Share
      <br className="max-md:hidden"/>
      <span className="orange_gradient text-center">AI Powred Prompts</span>
      </h1>
      <p className="desc text-center">Prompter is an open-source AI Prompting tool for modern world to discover, create and share creative prompts</p>
    {/* feed */}
    <Feed/>
    </section>
  )
}

export default page