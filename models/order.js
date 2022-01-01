import {model, models, Schema} from 'mongoose';

const OrderSchema = Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    pcode: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    tprice: {
        type: Number,
        required: true
    }
});

const Orders = models.Orders || model('Orders', OrderSchema);
export default Orders;