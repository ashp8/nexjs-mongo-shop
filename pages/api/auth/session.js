import { validateSession } from "../../../lib/unrelated";
import dbConnect from "../../../lib/connection";

export default async (req, res)=>{
    await dbConnect();
    if(req.cookies.sid){
        try{
            const user = await validateSession(req.cookies.sid);
            if(user){
                const resp = {username: user.username, type: user.type, _id: user._id};
                return res.json({redirect: '/', loggedIn:true, user:resp});
            }
            return res.send("should be logged in");
        }catch(err){
            return res.json({err: err.message});
        }
    }
    return res.send("not logged in");
};