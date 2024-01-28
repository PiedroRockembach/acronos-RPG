import type { AppProps } from 'next/app'

import '../styles/base.css'
import '../styles/output.css'
import '../styles/lobby.css'
import '../styles/header.css'
import '../styles/boards.css'
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
