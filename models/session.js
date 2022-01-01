import {model, Schema, models} from 'mongoose';

const userSessionSchema = Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: ()=>{
            let dt = new Date();
            dt.setHours(dt.getHours() + 4);
            return dt;
        }
    },
    ref: {
        type: Schema.Types.ObjectId,
        require: true,
    }
});

const UserSession = models.UserSession || model('UserSession', userSessionSchema);
export default UserSession;