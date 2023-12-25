import { HOME_LINK } from "@/routes/Route";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
// import { useRouter } from "next/router";

type FormProps = {
    type: String,
    post: {
        prompt: string;
        tag: string;
    },
    setPost: Dispatch<SetStateAction<{
        prompt: string;
        tag: string;
    }>>,
    submitting: boolean,
    setSubmitting: Dispatch<SetStateAction<boolean>>,
    handleSubmit: (e: any) => Promise<void>,
}

export default function Form({ type, post, setPost, submitting, setSubmitting, handleSubmit }: FormProps) {
    const route = useRouter();
    // const route = useRouter();
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">
                    {type} Post
                </span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination rin wild with any AI powered platform.
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-10 flex flex-col gap-7 ">
                <label>
                    <span className="form-satoshi font-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({
                            ...post,
                            prompt: e.target.value
                        })}
                        placeholder="Write your prompt here..."
                        className="form_textarea"
                        required
                    />
                </label>
                <label>
                    <span className="form-satoshi font-semibold text-base text-gray-700">
                        Tag {` `}
                        <span className="font-normal">(#product, #webdevelopment, #idea)</span>
                    </span>
                    <textarea
                        value={post.tag}
                        onChange={(e) => setPost({
                            ...post,
                            tag: e.target.value
                        })}
                        placeholder="#tag"
                        className="form_input"
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <button onClick={()=> route.back()} className="text-gray-500 text-sm">
                        Cancel
                    </button>
                    <button type="submit" disabled={submitting} className={`px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white ${submitting ? 'cursor-progress' : 'cursor-pointer' }`}>
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}
