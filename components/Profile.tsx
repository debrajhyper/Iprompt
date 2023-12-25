import PromptCard from "./PromptCard"

export default function Profile({ name, description, data, handleEdit, handleDelete }: Profile) {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name}</span> Profile
            </h1>
            <p className="desc text-left">
                {description}
            </p>
            <div className="mt-10 prompt_layout">
                {
                    data.map((post: Post) => (
                        <PromptCard 
                            key={post._id} 
                            post={post} 
                            handleTagClick={() => {}}
                            handleEdit={() => handleEdit && handleEdit(post)} 
                            handleDelete={() => handleDelete && handleDelete(post)} 
                        />
                    ))
                }
            </div>
        </section>
    )
}
