import Navbar from './Navbar';
import React, { Children } from 'react';

export default function Layout ({children}){
    return (
        <>
            <Navbar data={children.props} />
            <main>{children}</main>   
        </>
    );
};