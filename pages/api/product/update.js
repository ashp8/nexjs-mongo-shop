import { updateProduct } from "../../../lib/product/operations";
import { validateSession } from "../../../lib/unrelated";


export default async (req, res)=>{
    if(req.method === "POST"){
        if(req.cookies.sid){
            try{
                const valid = await validateSession(req.cookies.sid);
                if(valid){
                    req.body.pimg = 'https://picsum.photos/200';
                    const prod = await updateProduct(req.body);
                    return res.status(200).json({data: prod});
                }
                return res.json({msg: "Session not valid"});
            }catch(err){
                return res.json({msg: err.message});
            }
            
        }
        return res.json({msg: "Session not valid"});
    }
    return res.status(500).send("Server Can't Handle this request");
};