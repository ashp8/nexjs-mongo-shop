import UserSession from "../../../models/session";

export default async(req, res) =>{
    if(req.cookies.sid){
        try{
            const sess = await UserSession.findOne({_id: req.cookies.sid});
            if(sess){
                await sess.remove();
                return res.json({msg: "User is not logged in anymore!", loggedIn: false});
            }
            return res.json({msg: "User already logged out!"});
        }catch(err){
            console.log(err);
            return res.json({msg: err.message});
        }
    }
    return res.json({msg: "user not logged in"});
};