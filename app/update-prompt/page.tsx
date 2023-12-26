"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HOME_LINK } from "@/routes/Route"
import Form from "@/components/Form"
import { useSearchParams } from "next/navigation"

export default function UpdatePrompt() {
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const router = useRouter();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<Post>({
        prompt: '',
        tag: [],
    });

    const updatePrompt = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        if(!promptId) return alert('Prompt Id not found')

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            });

            if (res.ok) {
                router.back();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`);
            const data = await res.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId])
    

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            setSubmitting={setSubmitting}
            handleSubmit={updatePrompt}
        />
    )
}
