import '../styles/globals.css';
import {SessionProvider} from 'next-auth/react';
import Layout from '../Components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} data="hi" />
    </Layout>
    );

};



export default MyApp
