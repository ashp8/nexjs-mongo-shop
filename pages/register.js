import { useRouter } from "next/router";
import React, {useEffect} from "react";
import api from '../lib/api';

const Register = ()=>{
    const router = useRouter();
    useEffect(async () => {
        const resp = await api.get('/auth/session');
        if(resp.data.redirect){
            router.push(resp.data.redirect);
        };
    }, []);


    const formData = {};
    const handleSubmit = async (e)=>{
        e.preventDefault();
        formData.username = e.target.username.value;
        formData.password = e.target.password.value;
        formData.type = e.target.type.value;
        const resp = await api.post('/auth/register', formData); 
        router.reload(window.location.pathname);
    };

    return (
    <>
    <form className={"container"} onSubmit={(e)=>{handleSubmit(e)}}>
        <h3 style={{textAlign: "center"}}>User Register</h3>
        <label className="ilabel"> UserName
            <input type="text" name="username"/> 
        </label>   
        <label className="ilabel"> Password 
            <input type="password" name="password"/> 
        </label>
        <label className="ilabel">
            <select name="type">
                <option value="customer">Customer</option>
                <option value="shopkeeper">Shopkeeper</option>
            </select>
        </label>
        <button type="submit">Register</button>
    </form>
    <style jsx>
        {`
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
            .container {
                max-width: 80%;
                margin: 2rem auto;
                padding:2rem;
                background-color: #eee;
                border-radius: 3px;
                box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);
            }
        `}
    </style>
    </> 
    );
}



export default Register;