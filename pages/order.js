import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react';
import api from '../lib/api';

const Order = ()=>{
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({user: {username: null}});
    useEffect(async () => {
        const resp = await api.get('/auth/session');
        if(resp.data.loggedIn){
            if(resp.data.user.type !== 'customer'){
                router.push('/');
            }
            setLoggedIn(true);
            setData({...data, user: resp.data.user});
        }else{
            router.push('/');
        }
    }, []);

    return(<div>this is the customer page</div>);
};

export default Order;