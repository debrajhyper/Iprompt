"use client"
import { useState } from "react"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { HOME_LINK } from "@/routes/Route"
import Form from "@/components/Form"

export default function CreatePrompt() {
    const { data: session } = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    const createPrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: (session?.user as { id: String })?.id,
                    tag: post.tag,
                })
            });

            if (res.ok) {
                router.push(HOME_LINK)
            } else {
                throw new Error('Failed to create prompt');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }

    // if (!session?.user) {
    //     return router.push(HOME_LINK)
    // }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            setSubmitting={setSubmitting}
            handleSubmit={createPrompt}
        />
    )
}