import {BLogType} from "../utils/types";
import {posts} from "./posts-repository";
export const blogs = [] as BLogType[]
export const blogsRepository = {

   async findBlogByID(blogID:string) {
        return blogs.find(blog => blog.id === blogID);
    },
    async createBlog(body:BLogType) {
        const id = new Date().getTime().toString();
        const newBlog:BLogType = {
            id,
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }
        return newBlog
    },
    async updateBlog(blogID:string, body:BLogType) {
        const blogByID = blogs.find(blog => blog.id === blogID);
        if (blogByID) {
            blogByID.name = body.name ?? blogByID.name;
            blogByID.description = body.description ?? blogByID.description;
            blogByID.websiteUrl = body.websiteUrl ?? blogByID.websiteUrl;
            return true;
        } else {
            return false;
        }
    },
   async deleteBlog(blogID:string){
        const blogIndexToDelete = blogs.findIndex(blog => blog.id === blogID);
        if (blogIndexToDelete !== -1){
            blogs.splice(blogIndexToDelete, 1);
            return true
        } else {
            return false
        }
    }

}