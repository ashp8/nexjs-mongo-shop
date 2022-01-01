import Product from "../../models/product";

export const createProduct = async (p)=>{
    try{
        const prod =  await Product.create({
            pcode: p.pcode,
            pname: p.pname,
            pprice: p.price,
            pimg: p.pimg
        });
        return prod;

    }catch(err){
        return false;
    };
    return false;
};

export const updateProduct = async (p)=>{
    try{
        const prod =  await Product.findOne({pcode: p.pcode});
        if(prod){
            prod.pname = p.pname;
            prod.pprice = p.price;
            prod.pimg = p.pimg;
            await prod.save();
            return prod;
        }

    }catch(err){
        return false;
    };
    return false;
};
