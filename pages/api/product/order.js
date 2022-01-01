import Product from "../../../models/product";
import {validateSession} from '../../../lib/unrelated';
import Orders from "../../../models/order";

export default async (req,res) =>{
    if(req.method === "POST"){
        if(req.cookies.sid){
            try{
                const valid = await validateSession(req.cookies.sid);
                if(valid){
                    console.log(req.body.quantity)
                    const prod = await Product.findOne({_id: req.body._id});
                    const order = await Orders.create({
                        customerId: valid._id,
                        pcode: prod.pcode,
                        quantity: req.body.quantity,
                        tprice: req.body.quantity * prod.pprice,
                    });
                    return res.status(200).json({msg: "order is placed!"});
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