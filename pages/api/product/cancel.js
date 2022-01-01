import Orders from "../../../models/order";
import {validateSession} from '../../../lib/unrelated';

export default async (req,res) =>{
    if(req.method === "POST"){
        if(req.cookies.sid){
            try{
                const valid = await validateSession(req.cookies.sid);
                if(valid){
                    const prod = await Orders.findOne({_id: req.body._id});
                    await prod.remove();
                    return res.status(200).json({msg: "order is deleted!"});
                }
                return res.json({msg: "Session is invalid"});
            }catch(err){
                return res.json({msg: err.message});
            }
        }

        return res.json({msg: "Session is invalid"});
    }
    return res.status(500).json({msg: "This request is unsuppored by the route."});
};