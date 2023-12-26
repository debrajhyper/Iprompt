'use client'
import { MouseEventHandler, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"


type PromptCardProps = {
    post: ProfilePost,
    handleTagClick: Function,
    handleEdit: MouseEventHandler<HTMLParagraphElement>,
    handleDelete: MouseEventHandler<HTMLParagraphElement>
}

export default function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: PromptCardProps) {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const [copied, setCopied] = useState("");

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => {
            setCopied("");
        }, 3000);
    }
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Image src={post.creator.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" />
                    <div className="flex flex-col">
                        <h3 className="font-satoshi font-semibold text-gray-900">
                            {post.creator.username}
                        </h3>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="copy_btn" onClick={handleCopy}>
                        <Image src={copied !== post.prompt ? '/assets/icons/expand.svg' : '/assets/icons/shrink.svg'} alt="expand" width={14} height={14} />
                    </div>
                    <div className="copy_btn" onClick={handleCopy}>
                        <Image src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'} alt="copy" width={14} height={14} />
                    </div>
                </div>
            </div>
            <p className="my-4 font-satoshi text-sm text-gray-700 line-clamp-3">
                {post.prompt}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, est aut cum sapiente dicta hic beatae, id magnam ea placeat aperiam non numquam magni quibusdam sint deserunt facilis laborum qui?
            </p>
            <p onClick={() => handleTagClick && handleTagClick(post.tag)} className="font-inter text-sm blue_gradient cursor-pointer underline hover:underline-offset-2">
                {post.tag}
            </p>

            {
                (session?.user as { id: String })?.id === post.creator._id && pathName === '/profile' && (
                    <div className="font-inter mt-5 flex-end gap-5 border-t border-gray-300 pt-3">
                        <button onClick={() => handleEdit} className="w-20 px-5 py-1.5 text-sm bg-green-500 border-2 border-green-500 rounded-full text-white cursor-pointer">
                            Edit
                        </button>
                        <button onClick={() => handleDelete} className={`w-20 px-5 py-1.5 text-sm border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white cursor-pointer`}>
                            Delete
                        </button>
                    </div>
                )
            }
        </div>
    )
}
