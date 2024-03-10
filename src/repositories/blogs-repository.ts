import {BLogType, PostType} from "../utils/types";
import {client} from "./db";
export const blogs = [] as BLogType[]

const blogsCollection =  client.db('learning').collection<BLogType>('blogs')
export const blogsRepository = {

   async findBlogByID(blogID:string):Promise<BLogType | null> {
       const blog: BLogType | null = await blogsCollection.findOne({_id:blogID});
       if (blog && blog._id) {
           blog.id = blog._id;
           delete blog['_id'];
       }
        return blog
    },
    async createBlog(body:BLogType) {
        const newBlog:BLogType = {
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const result = await blogsCollection.insertOne(newBlog);
        if (newBlog['_id']) {
            newBlog.id = newBlog['_id'];
            delete newBlog['_id'];
        }
        return newBlog;
    },
    async updateBlog(blogID:string, body:BLogType) {
        const result = await blogsCollection.updateOne({_id:blogID},
            {name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl
            });

        return result.matchedCount === 1;
    },
   async deleteBlog(blogID:string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({_id:blogID});
        return result.deletedCount === 1
    }

}