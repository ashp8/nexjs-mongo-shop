import User from '../../../models/user';
import dbConnect from '../../../lib/connection';
import {createSession, generateHash} from '../../../lib/unrelated';
import { ObjectId} from 'bson';
import {serialize} from 'cookie';

export default async (req, res)=>{
    await dbConnect();
    if(req.method === "POST"){
        const {username, password, type} = req.body;
        try{
            const hash = await generateHash(password);
            const usr = await User.findOne({username});
            if(usr){
                return res.json({err: "User Already there!"});
            }
            const user = await User.create({
                username: username,
                password: hash,
                type: type,
            });
            const session = await createSession(ObjectId(user._id)); 
            const resp = {username: user.username, type: user.type, id: user._id};
            session.user = resp;
            try{
                res.setHeader('Set-Cookie', serialize('sid', session._id, { path: '/'}));
            }catch(err){
                console.log(err);
            }
            // req.session.user = session;
            return res.status(200).json({data: session});
        }catch(err){
            return res.status(500).send("Server Error!!");
        }
    }else{
        return res.status(500).json({err: "This router can't handle requests!"});
    }
};