import { MongoClient } from 'mongodb';
//|| 'mongodb+srv://dimakurgan123789:annogolik123789@blogsplatform.mxifx0s.mongodb.net/?retryWrites=true&w=majority&appName=BlogsPlatform';
const mongoURI = process.env.MONGO_URL
if (!mongoURI){
    throw new Error('Database url is not defined!')
}
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