import { connectToDb } from "@/database/database";
import Prompt from "@/models/prompt";

export const GET = async (req: any, { params }: any) => {
    try {
        await connectToDb();

        console.log('USER ID --------------------> ', params)
        if (!params || !params.id) {
            return new Response('Missing id parameter', { status: 400 });
        }

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}