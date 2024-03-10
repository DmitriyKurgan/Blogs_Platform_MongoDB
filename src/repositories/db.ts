import { MongoClient } from 'mongodb';


//const mongoURI = process.env.MONGO_URL || "mongodb://0.0.0.0:27017:/?maxPoolSize=206w=majority";
//MONGO_URL="mongodb+srv://a:a@ava.epzello.mongodb.net/?retryWrites=true&w=majority"
const mongoURI = process.env.MONGO_URL || 'mongodb+srv://dimakurgan123789:annogolik123789@blogsplatform.mxifx0s.mongodb.net/?retryWrites=true&w=majority&appName=BlogsPlatform';

export const client = new MongoClient(mongoURI);

export async function runDB (){
    try {
        await client.connect();
        await client.db('blogs').command({ping:1});
        console.log('Successfully connected to server');

    } catch (error) {
        console.log('Problem with connection to DB');
        await client.close();
    }
}