import mongoose from 'mongoose';

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

const dbConnect = async ()=>{
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(process.env.MONGOURI, options).then(mongoose=>{
            return mongoose;
        });
    }
    
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
