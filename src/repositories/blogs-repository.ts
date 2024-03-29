import {BLogType, OutputBlogType, PostType} from "../utils/types";
import {client} from "./db";
import {ObjectId,WithId} from "mongodb";
export const blogs = [] as BLogType[]

export const BLogMapper = (blog : WithId<BLogType>) : OutputBlogType => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

const blogsCollection =  client.db('learning').collection<BLogType>('blogs')
export const blogsRepository = {

   async findBlogByID(blogID:string):Promise<OutputBlogType | null> {
       const blog: WithId<BLogType> | null = await blogsCollection.findOne({_id: new ObjectId(blogID)});
       return blog ? BLogMapper(blog) : null
    },
    async createBlog(body:BLogType):Promise<OutputBlogType | null> {
        const newBlog:BLogType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result:any = await blogsCollection.insertOne(newBlog);
        const blog = await blogsCollection.findOne({_id: result.insertedId});
        return blog ? BLogMapper(blog) : null;
    },
    async updateBlog(blogID:string, body:BLogType):Promise<boolean> {

        const result = await blogsCollection.updateOne({_id: new ObjectId(blogID)},
            {$set:{name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
            }}
        );

        return result.matchedCount === 1;
    },
   async deleteBlog(blogID:string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({_id:new ObjectId(blogID)});
        return result.deletedCount === 1
    }

}