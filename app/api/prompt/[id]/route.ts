import { connectToDb } from "@/database/database";
import Prompt from "@/models/prompt";

export const GET = async (req: any, { params }: any) => {
    try {
        await connectToDb();

        console.log('USER ID --------------------> ', params)
        if (!params || !params.id) {
            return new Response('Missing id parameter', { status: 400 });
        }

        const prompt = await Prompt.findById(params.id).populate('creator');
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

export const PATCH = async (req: any, { params }: any) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDb();

        console.log('USER ID --------------------> ', params)
        if (!params || !params.id) {
            return new Response('Missing id parameter', { status: 400 });
        }

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
}

export const DELETE = async (req: any, { params }: any) => {
    try {
        await connectToDb();

        console.log('USER ID --------------------> ', params)
        if (!params || !params.id) {
            return new Response('Missing id parameter', { status: 400 });
        }

        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to fetch all prompts', { status: 500 })
    }
} 