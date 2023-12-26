'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@/components/Profile"

export default function MyProfile() {
    const { data: session } = useSession();
    const router = useRouter();
    // console.log('USER SESSION ->', session);
    const [posts, setPosts] = useState<ProfilePost[]>([]);

    const handleEdit = (post: ProfilePost) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post: ProfilePost) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })

                const filteredPosts = posts.filter((p) => p._id !==  post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`/api/users/${(session?.user as { id: String })?.id}/posts`);
            console.log('------------------------------------------->', res);
            const data = await res.json();
            console.log('------------------------------------------->', data);
            setPosts(data)
        }

        if ((session?.user as { id: String })?.id) fetchPost();
    }, [session?.user])

    return (
        <Profile
            name="My"
            description="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}