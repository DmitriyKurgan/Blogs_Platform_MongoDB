import {Request,Response} from 'express';
import {runDB} from "./repositories/db";
import {app} from "./app_settings";

const port = process.env.port || 5000;

app.get('/', (req:Request, res:Response)=>{
    res.send('DEFAULT GET REQUEST')
})

const startsAPP = async () =>{
    await runDB();
    app.listen(port, ()=> {
        console.log(`Example app listening on port ${port}`)
    })
}

startsAPP();




