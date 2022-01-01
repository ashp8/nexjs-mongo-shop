import bcrypt from 'bcrypt';
import UserSession from '../models/session';
import User from '../models/user';

export const generateHash = async (password) =>{
    return await bcrypt.hash(password, 10);
};

export const validateHash = async(password1, password2)=>{
    return bcrypt.compare(password1, password2);
}

export const validateSession = async(session)=>{
    const sess = await UserSession.findOne({_id: session});
    if(sess){
        const user = await User.findOne({_id: sess.ref});
        if(user){
            if(Date.now() > sess.expiredAt){
                await sess.remove();
                return false;
            }
            return user;
        }
        else{
            return false;
        }
    }
    return false;
};

export const createSession = async(userId)=>{
    const sess = await UserSession.create({
        ref: userId,
    });
    return sess;
};