import Cross from "@/public/assets/icons/cross";
import Loading from "@/public/assets/icons/loading";
import { HOME_LINK } from "@/routes/Route";
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
// import { useRouter } from "next/router";

type FormProps = {
    type: String,
    post: Post
    setPost: Dispatch<SetStateAction<Post>>,
    submitting: boolean,
    setSubmitting: Dispatch<SetStateAction<boolean>>,
    handleSubmit: (e: any) => Promise<void>,
}

export default function Form({ type, post, setPost, submitting, setSubmitting, handleSubmit }: FormProps) {
    const route = useRouter();
    // const route = useRouter();

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setPost({
            ...post,
            [name]: value
        });
    };
    const functionAddTags = (event: any) => {
        const { value } = event.target;
        if (value.trim() === '' || value.trim() === '#') return
        const formattedTag = value.replace(/\s+/g, '').toLowerCase();
        const tag = formattedTag.startsWith('#') ? formattedTag : `#${formattedTag}`;
        setPost((prevPost) => ({
            ...prevPost,
            tag: [...prevPost.tag, tag]
        }));
        event.target.value = null;
    };
    const functionRemoveTags = (indexToRemove: number) => {
        setPost({
            ...post,
            tag: [...post.tag.filter((_, index) => index !== indexToRemove)]
        });
    };
    const handleEnter = (event: any) => {
        if (event.key.toLowerCase() === "enter") {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 0].focus();
            event.preventDefault();
        }
    };

    return (
        <section className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-2 auto-cols-max">
            <div>
                <h1 className="head_text text-left mt-2">
                    <span className="orange_gradient_simple">
                        {type} Post
                    </span>
                </h1>
                <p className="desc text-left max-w-md">
                    {type} and share amazing prompts with the world, and let your imagination rin wild with any AI powered platform.
                </p>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-5">
                    <label>
                        <span className="form-satoshi font-semibold text-base text-gray-700">
                            Your AI Prompt
                        </span>
                        <textarea
                            name="prompt"
                            value={post.prompt}
                            onChange={event => handleChange(event)}
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
                        <input
                            name="tag"
                            type="text"
                            onKeyUp={event => event.key === "Enter" ? functionAddTags(event) : null}
                            onKeyDown={event => handleEnter(event)}
                            placeholder="#tag"
                            className="form_input"
                        />
                        <ul id="tags" className="flex flex-auto flex-wrap py-1">
                            {
                                post?.tag &&
                                post?.tag?.map((tag, index) => (
                                    <li key={index} className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-blue-100/60 rounded-full text-blue-600 border border-blue-300">
                                        <div className="text-xs font-normal leading-none max-w-full flex-initial">{tag}</div>
                                        <div onClick={() => functionRemoveTags(index)}>
                                            <Cross />
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </label>
                    <div className="flex-start justify-start items-center ml-0 mx-3 mb-10 gap-4">
                        <button type="submit" disabled={submitting} className={`w-20 px-5 py-1.5 text-sm bg-primary-orange border-2 border-primary-orange rounded-full text-white ${submitting ? 'cursor-progress' : 'cursor-pointer'}`}>
                            {true ? (<svg className="w-5 h-5 mr-3 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>) : type}
                        </button>
                        <button onClick={() => route.back()} className="text-gray-500 text-sm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}