'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }: { data: ProfilePost[], handleTagClick: Function }) => {
    return (
        <div className="mt-10 prompt_layout">
            {
                data.map((post: ProfilePost) => (
                    <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} handleEdit={() => { }} handleDelete={() => { }} />
                ))
            }
        </div>
    )
}

export default function Feed() {
    const [searchText, setSearchText] = useState('');
    const [profilePost, setProfilePost] = useState<ProfilePost[]>([]);

    const handleSearchChange = (e: any) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch('/api/prompt');
                const data = await res.json();
                setProfilePost(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }

        fetchPost();
    }, [])


    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                    required
                />
            </form>
            <PromptCardList data={profilePost} handleTagClick={() => { }} />
        </section>
    )
}
