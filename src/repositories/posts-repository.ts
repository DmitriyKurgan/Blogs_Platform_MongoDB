import {PostType} from "../utils/types";
import {client} from "./db";
export const posts = [] as PostType[]

const postsCollection =  client.db('learning').collection<PostType>('blogs')
export const postsRepository = {
    async findPostByID(postID:string):Promise<PostType | null> {
        return await postsCollection.findOne({id:postID});
    },
   async createPost(body:PostType, blogName:string):Promise<PostType> {
        const newPost:PostType = {
            id:new Date().getTime().toString(),
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName,
            createdAt: new Date().toISOString()
        }

       const result = await postsCollection.insertOne(newPost)
       return newPost

    },
   async updatePost(postID:string, body:PostType): Promise<boolean> {
        const result = await postsCollection.updateOne({id:postID},
            {$set: {
                    title: body.title,
                    shortDescription: body.shortDescription,
                    content: body.content,
                    blogId: body.blogId
                }});
       return result.matchedCount === 1
    },
   async deletePost(postID:string){

        const result = await postsCollection.deleteOne({id:postID})

       return result.deletedCount === 1
    }

}