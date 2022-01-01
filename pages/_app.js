import '../styles/globals.css';
import Layout from '../Components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} data="hi" />
    </Layout>
    );

};



export default MyApp;
