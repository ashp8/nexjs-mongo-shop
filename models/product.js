import {models, model,Schema} from 'mongoose';

const ProductSchema = Schema({
    pcode:{
        type: String,
        required: true,
    },
    pname: {
        type: String, 
        required: true,
    },
    pprice: {
        type: Number,
        required: true,
    },
    pimg: {
        type: String
    }
});

const Product = models.Product || model('Product', ProductSchema);
export default Product;