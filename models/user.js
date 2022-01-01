import {Schema, model, models} from 'mongoose';

const user = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: false,
    }
});

const User = models.User || model("User", user);
export default User;