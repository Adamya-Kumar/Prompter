import { connectDB } from "@utils/database";
import Prompt from "@model/prompt";
// GET
export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id);
    if (!prompt) {
      return new Response(`Prompt not found ${params.id}`, {
        status: 404,
      });
    }
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to fetch all Prompt ${error}`, {
      status: 500,
    });
  }
};

//PATCH
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectDB();

    const updatePrompt = await Prompt.findById(params.id);
    if (!updatePrompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }
    updatePrompt.prompt = prompt;
    updatePrompt.tag = tag;

    await updatePrompt.save();
    return new Response(JSON.stringify(updatePrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompt.", {
      status: 500,
    });
  }
};
//DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectDB();

        await Prompt.findByIdAndDelete(params.id);
          return new Response("Delete prompt successfully.", {
      status: 200,
    }); 
    } catch (error) {
        return new Response("Failed to delete prompt.", {
      status: 500,
    }); 
    }
};
