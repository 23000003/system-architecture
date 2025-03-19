
export type Post = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    date_posted: string;
}

export type User = {
    id: number;
    username: string;
}