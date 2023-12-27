type ProfilePost = {
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
    tag?: string[];
}

type Profile = {
    name: String,
    description: String,
    data: ProfilePost[],
    handleEdit: Function,
    handleDelete: Function
}

type Post = {
    prompt: string,
    tag: string[]
}