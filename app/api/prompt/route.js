import { connectDB } from "@utils/database";
import Prompt from "@model/prompt";

export const GET = async (req) => {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const tag = searchParams.get("tag");
        let prompts;
        if (tag) {
            prompts = await Prompt.find({ tag }).populate("creator");
        } else {
            prompts = await Prompt.find({}).populate("creator");
        }
        return new Response(JSON.stringify(prompts), {
            status: 200,
        });
    } catch (error) {
        return new Response(`Failed to fetch all Prompt ${error}`, {
            status: 500,
        });
    }
};