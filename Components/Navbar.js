import Link from "next/link";
import React, {useEffect, useState}  from "react";
import style from '../styles/Navbar.module.css';
import api from '../lib/api';
import { useRouter } from "next/router";

const Navbar = ({})=>{
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({user: {username: null}});
    useEffect(async () => {
        const resp = await api.get('/auth/session');
        if(resp.data.loggedIn){
            setLoggedIn(true);
            setData({...data, user: resp.data.user});
        }
    }, []);

    const logout = async()=>{
        const resp = await api.get('/auth/logout');
        router.reload(window.location.pathname);
    }

    return (
        <nav className={style.nav}>
            <div className={loggedIn ? 'container2' : 'container'}>
                <Link href="/"><a className={style.link}>Home</a></Link>
                {(loggedIn && data.user.type === 'customer') ? (<Link href="/order"><a className={style.link}>Order</a></Link>):""}
                {(loggedIn && data.user.type === 'shopkeeper') ? (<Link href="/shop"><a className={style.link}>Shop</a></Link>):""}

                {loggedIn ? (
                
                <div className={style.link}>
                    <div>{data.user.type}({data.user.username} | <a className={"logout"} onClick={logout}>logout</a>)</div>
                </div>
                
                ): (<>
                <Link href="/login"><a className={style.link}>Login</a></Link>
                <Link href="/register"><a className={style.link}>Register</a></Link>
                </>)}
            </div>
            <style jsx>
                {`
                    .container{
                        display: flex;
                        
                    }
                    .container2{
                        display: flex;
                        justify-content: space-between;
                    }
                    .profile{
                        align-items: center;
                    }
                    .logout{
                        color: lightblue;
                        text-style: link;
                        cursor: pointer;
                    }
                `}
            </style>
        </nav>
    );
};


export default Navbar;