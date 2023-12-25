import { connectToDb } from "@/database/database";
import Prompt from "@/models/prompt";

export const POST = async (req: any) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDb();

        const newPrompt = new Prompt({ creator: userId, prompt, tag, });
        console.log('route.ts PROMPT CREATED -> ', newPrompt);

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to create a new prompt', { status: 500 })
    }
}