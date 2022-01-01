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

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(async ()=>{
        const resp = await api.get('/product/view') ;
        if(resp){
            setProducts(resp.data.data);
        }
    }, []);

    useEffect(async()=>{
        const resp = await api.get('/product/orders') ;
        if(resp){
            setOrders(resp.data.data);
        }
    }, []);

    const submitOrder = async (e, _id) =>{
        e.preventDefault();
        await api.post('/product/order', {_id: _id, quantity:  e.target.qinput.value});
        router.reload(window.location.pathname);
    };

    return(
        <>
            <div className="container">
                <h3>Products</h3>
               {products && products.map(p=>(
               <div className="listitem" key={p.pcode}>
                   <img src={p.pimg} className="pimg"/> 
                   <div>#{p.pcode}</div>
                   <div className="nps">
                       <div className="pname">{p.pname}</div>
                       <div className="pprice">${p.pprice}</div>
                   </div>
                   <form className="orderm" onSubmit={(e)=>{submitOrder(e, p._id)}}>
                       <input required type="number" min="1" max="20" name="qinput" className="qinput" />
                       <button type="submit" className="qinput">Order</button>
                   </form>
               </div>
               ))} 
            </div>
        <div className="container">
            <h3>My Orders</h3>
            {orders && orders.map(p=>(
               <div className="listitem" key={p._id}>
                   <img src={p.pimg} className="pimg"/> 
                   <div>#{p.pcode}</div>
                   <div className="nps">
                       <div className="pname">{p.customerId}</div>
                       <div className="pprice">${p.tprice}</div>
                   </div>
                   <div>
                       <button onClick={async ()=>{await api.post('/product/cancel', {_id: p._id});router.reload(window.location.pathname)}}>X</button>
                   </div>                 

               </div>
               ))} 
        </div>
        <style jsx>
            {`
                .qinput{
                    display: block;
                    width: 3rem;
                    margin-top: 1rem;
                    margin-right: 1rem;
                }
                .orderm{
                    display: flex;
                    justify-content: space-evenly;
                }
                .listitem .pimg{
                    width: 64px;
                    height: 64px;                        
                }
                .listitem{
                    display: flex;
                    justify-content: space-between;
                    background-color: #ddd;
                    margin-top: 0.2rem;
                }
                .container{
                    margin: 1rem;
                    padding: 0.5rem;
                    background-color: #eee;
                    border-radius: 5px;
                    box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.1);
                }
                .titles{
                    font-size: 1.25 rem;
                    color: green;
                    background-color: #ddd;
                    padding: 1rem;
                    display: flex;
                    justify-content: space-between;
                }

                button{
                    margin-left: 0.5rem;
                    height: 2rem;
                }
                input{
                    width: 100%;
                    height: 2rem;
                }
                .ilabel{
                    display: block;
                    margin: 0.5rem;
                }
            `}            
        </style>
        </>
    );
};

export default Order;