import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import api from '../lib/api';


const Shop = ()=>{
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({user: {username: null}});
    
    useEffect(async () => {
        const resp = await api.get('/auth/session');
        if(resp.data.loggedIn){
            if(resp.data.user.type !== 'shopkeeper'){
                router.push('/');
            }
            setLoggedIn(true);
            setData({...data, user: resp.data.user});
        }else{
            router.push('/');
        }
    }, []);
    const [operation, setOperation] = useState("create");
    const [products, setProducts] = useState([]);

    useEffect(async ()=>{
        const resp = await api.get('/product/view') ;
        if(resp){
            setProducts(resp.data.data);
        }
    }, []);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(operation === 'create'){
            const fdata = {};
            fdata.pcode = e.target.pcode.value;
            fdata.pname = e.target.pname.value;
            fdata.price = e.target.pprice.value;
            fdata.pimg = e.target.pimg.value;
            const resp = await api.post('/product/create', fdata);
            console.log(resp);
        }else if(operation === 'update'){
            const fdata = {};
            fdata.pcode = e.target.pcode.value;
            fdata.pname = e.target.pname.value;
            fdata.price = e.target.pprice.value;
            fdata.pimg = e.target.pimg.value;
            const resp = await api.post('/product/update', fdata);
            console.log(resp);
        }
        router.reload(window.location.pathname);
    };

   return (
        <>
            <div className={"container"}>
                <div className="titles">
                   <div>Select your shop Operation.</div> 
                   <div>
                       <select onChange={(e)=>{setOperation(e.target.value)}}>
                           <option value="create">Add Product</option>
                           <option value="update">Edit Product</option>
                           <option value="delete">Delete Product</option>
                       </select>
                   </div>
                </div>
                <div className="operation">
                    {operation === 'create' && (<form onSubmit={(e)=>{handleSubmit(e)}}>
                        <h3 style={{textAlign: 'center'}}>Add page!</h3>
                        <label className="ilabel">
                            Product Code
                            <input name="pcode" placeholder="product code!"/>
                        </label>
                        <label className="ilabel">
                            Product Name 
                            <input name="pname" placeholder="product name!"/>
                        </label>
                         <label className="ilabel">
                            Product Price 
                            <input name="pprice" placeholder="product price!"/>
                        </label>
                         <label className="ilabel">
                            Product Image 
                            <input name="pimg" placeholder="product image!"/>
                        </label>
                        <button type="submit">Add!</button>
                    </form>)}
                    {operation === 'update' && (
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                        <h3 style={{textAlign: 'center'}}>Update page!</h3>
                        <label className="ilabel">
                            Product Code
                            <input name="pcode" placeholder="product code!"/>
                        </label>
                        <label className="ilabel">
                            Product Name 
                            <input name="pname" placeholder="product name!"/>
                        </label>
                         <label className="ilabel">
                            Product Price 
                            <input name="pprice" placeholder="product price!"/>
                        </label>
                         <label className="ilabel">
                            Product Image 
                            <input name="pimg" placeholder="product image!"/>
                        </label>
                        <button type="submit">Add!</button>
                    </form>
                    )}
                    {operation === 'delete' && (<div>delete</div>)}
                </div>
                
            </div>
            <div className="container">
               {products && products.map(p=>(
               <div className="listitem" key={p.pcode}>
                   <img src={p.pimg} className="pimg"/> 
                   <div>{p.pcode}</div>
                   <div className="nps">
                       <div className="pname">{p.pname}</div>
                       <div className="pprice">{p.pprice}</div>
                   </div>
                   <div>
                       <button onClick={async ()=>{await api.post('/product/delete', {_id: p._id});router.reload(window.location.pathname)}}>X</button>
                   </div>
               </div>
               ))} 
            </div>
            <style jsx>
                {`
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

export default Shop;