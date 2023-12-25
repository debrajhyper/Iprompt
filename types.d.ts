type Profile = {
    name: String,
    description: String,
    data: Post[],
    handleEdit: Function,
    handleDelete: Function
}

type Post = {
    [x: string]: any
    _id: string;
    creator: {
        _id: string;
        email: string;
        username: string;
        image: string;
        __v: number;
    };
    prompt: string;
    __v: number;
    tag?: string; // Optional property if present in some objects
};