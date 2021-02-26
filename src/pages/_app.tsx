import { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/globals.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <div id='container'>
      <Header />
      <div id='content'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
