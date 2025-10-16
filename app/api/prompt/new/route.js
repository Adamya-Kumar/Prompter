import { connectDB } from "@utils/database";
import Prompt from "@model/prompt";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt),{
        status:201
    })
  } catch (error) {
    return new Response("Failed to Create New Prompt",{
        status:500
    })
  }
};
