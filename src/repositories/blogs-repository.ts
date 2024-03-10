import {BLogType, PostType} from "../utils/types";
import {client} from "./db";
export const blogs = [] as BLogType[]

const blogsCollection =  client.db('learning').collection<BLogType>('blogs')
export const blogsRepository = {

   async findBlogByID(blogID:string):Promise<BLogType | null> {

        return await blogsCollection.findOne({id:blogID});
    },
    async createBlog(body:BLogType) {
        const newBlog:BLogType = {
            id:new Date().getTime().toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        if ('_id' in newBlog) {
            delete newBlog._id;
        }
        const result = blogsCollection.insertOne(newBlog);
        return newBlog
    },
    async updateBlog(blogID:string, body:BLogType) {
        const result = await blogsCollection.updateOne({id:blogID},
            {name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
            });

        return result.matchedCount === 1;
    },
   async deleteBlog(blogID:string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({id:blogID});
        return result.deletedCount === 1
    }

}