import Appbar from '@/components/Appbar';
import { InitUser } from '@/components/InitUser';
import type { AppProps } from 'next/app'
import { RecoilRoot, useRecoilValue } from 'recoil'
import { Loading } from '../components/Loading';
import { isUserLoading } from '@/store/selectors/isUserLoading';

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <App2 Component={Component} pageProps={pageProps} />
    {/* <Component {...pageProps} /> */}
    </RecoilRoot>;
}

function App2({Component, pageProps}) {
  const userLoading = useRecoilValue(isUserLoading);
  if (userLoading) {
    return <>
    <Loading />
    <InitUser />
  </>
  }
  return <div> 
    <Appbar />
    <Component {...pageProps} /> 
  </div>
}