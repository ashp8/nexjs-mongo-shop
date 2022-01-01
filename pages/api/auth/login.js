import { serialize } from "cookie";
import {generateHash, createSession, validateHash} from '../../../lib/unrelated';
import { ObjectId } from "bson";
import User from '../../../models/user';

export default async(req, res) =>{
    if(req.method === "POST"){
        const {username, password} = req.body;
        try{
            const user = await User.findOne({username});
            if(user){
                if(validateHash(password, user.password)){
                    const session = await createSession(ObjectId(user._id)); 
                    const resp = {username: user.username, type: user.type, id: user._id};
                    session.user = resp;
                    res.setHeader('Set-Cookie', serialize('sid', session._id, { path: '/'}));
                    return res.status(200).json({data: session});
                }
                return res.json({msg: "Password may be invalid!"});
            }
            return res.json({msg: "Username may be invalid!"});
            
        }catch(err){
            return res.status(500).send("Server Error!!");
        }
    }else{
        return res.status(500).json({err: "This router can't handle requests!"});
    }
};