import {PostType} from "../utils/types";
export const posts = [] as PostType[]
export const postsRepository = {

    async findPostByID(postID:string) {
        return await posts.find(post => post.id === postID);
    },
    createPost(body:PostType, blogName:string):PostType {
        const id = new Date().getTime().toString();
        const newPost:PostType = {
            id,
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName,
            createdAt: new Date().toISOString()
        }
        return newPost
    },
    updatePost(postID:string, body:PostType):boolean {
        const postByID = posts.find(post => post.id === postID);
        if (postByID) {
            postByID.title = body.title ?? postByID.title;
            postByID.shortDescription = body.shortDescription ?? postByID.shortDescription;
            postByID.content = body.content ?? postByID.content;
            postByID.blogId = body.blogId ?? postByID.blogId;
            return true;
        } else {
            return false;
        }
    },
    deletePost(postID:string){
        const postIndexToDelete = posts.findIndex(post => post.id === postID);
        if (postIndexToDelete !== -1){
            posts.splice(postIndexToDelete, 1);
            return true
        } else {
            return false
        }

    }

}