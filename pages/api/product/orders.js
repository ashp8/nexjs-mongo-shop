import { validateSession } from "../../../lib/unrelated";
import Orders from "../../../models/order";

export default async (req, res)=>{
    try{
        if(req.cookies.sid){
            const valid = await validateSession(req.cookies.sid);
            if(valid) {
                const products = await Orders.find({customerId: valid._id});
                return res.status(200).json({data: products});
            }
            return res.json({msg: "Session is not valid!"});
        }
        return res.json({msg: "Session is not valid!"});

    }catch(err){
        return res.status(500).json({msg: err.message});
    };
};