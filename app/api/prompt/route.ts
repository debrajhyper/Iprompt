import { connectToDb } from "@/database/database";
import Prompt from "@/models/prompt";

export const GET = async () => {
    try {
        await connectToDb();

        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}