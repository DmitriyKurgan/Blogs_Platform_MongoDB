import {Request, Response, Router} from "express";
import {validateAuthorization, validateBlogsRequests, validateErrorsMiddleware} from "../middlewares/middlewares";
import {CodeResponsesEnum} from "../utils/utils";
import {blogs, blogsRepository} from "../repositories/blogs-repository";

export const blogsRouter = Router({})


blogsRouter.get('/', (req: Request, res: Response)=> {
    res.send(blogs).status(CodeResponsesEnum.OK_200)
});

blogsRouter.get('/:id', async (req:Request, res: Response) => {
    const blogID = req.params.id;
    const blogByID = await blogsRepository.findBlogByID(blogID);
    if (!blogID || !blogByID){
        res.sendStatus(CodeResponsesEnum.Not_found_404);
        return
    }
    res.status(CodeResponsesEnum.OK_200).send(blogByID);
})

blogsRouter.post('/', validateAuthorization, validateBlogsRequests, validateErrorsMiddleware, async (req:Request, res: Response) => {
    const newBlog = await blogsRepository.createBlog(req.body)
   if (newBlog){
       blogs.push(newBlog)
       res.status(CodeResponsesEnum.Created_201).send(newBlog)
   }
});

blogsRouter.put('/:id', validateAuthorization, validateBlogsRequests, validateErrorsMiddleware, async (req:Request, res:Response) => {
    const blogID = req.params.id;
    debugger
    const isUpdated = await blogsRepository.updateBlog(blogID, req.body);

    if (isUpdated){
        const blog = await blogsRepository.findBlogByID(blogID);
        res.status(CodeResponsesEnum.Not_content_204).send(blog);
    } else {
        res.sendStatus(CodeResponsesEnum.Not_found_404)
    }
});

blogsRouter.delete('/:id', validateAuthorization, validateErrorsMiddleware, async (req:Request, res:Response) => {
    const blogID = req.params.id;
    const isDeleted = await blogsRepository.deleteBlog(blogID);
    if(!isDeleted || !blogID){
        res.sendStatus(CodeResponsesEnum.Not_found_404);
        return;
    }
    res.sendStatus(CodeResponsesEnum.Not_content_204);
})


