import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Context as ResponsiveContext } from 'react-responsive'
import theme from '@/components/themes'
import reduxWrapper from '@/store'
import MobileDetect from 'mobile-detect'

const DynamicErrorToastContainer = dynamic(
  () => import('@/components/organisms/ErrorToastContainer'),
  { ssr: false }
)
const getPredictedWidthFromUserAgent = (userAgent) => {
  const md = new MobileDetect(userAgent)
  if (md.tablet()) {
    return theme.breakpoints.md
  }
  if (md.mobile()) {
    return theme.breakpoints.sm
  }
  return theme.breakpoints.lg
}

const App = ({ initialWindowWidth, Component, pageProps }) => {
  const [windowWidth, setWindowWidth] = useState(initialWindowWidth)

  useEffect(() => {
    const resize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    resize()
    return () => {
      window.removeEventListener('resize', resize, false)
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <ResponsiveContext.Provider value={{ width: windowWidth }}>
          <Component {...pageProps} />
          {/* <DynamicErrorToastContainer /> */}
        </ResponsiveContext.Provider>
      </ThemeProvider>
    </>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  const fetchPromises = []
  const windowWidth = process.browser
    ? window.innerWidth
    : getPredictedWidthFromUserAgent(ctx.req.headers['user-agent'])
  if (Component.getInitialProps) {
    fetchPromises.push(Component.getInitialProps(ctx))
  }

  try {
    const fetchedData = await Promise.all(fetchPromises)
    if (ctx.res) {
      ctx.res.shouldCache = fetchedData.every((d) => d.successfulFetch)
    }
    const pageProps = fetchedData.pop() || {}
    return {
      pageProps,
      initialWindowWidth: windowWidth,
    }
  } catch (e) {
    console.error(e, {
      context: 'App.getInitialProps',
    })
    return {
      pageProps: {},
      initialWindowWidth: windowWidth,
    }
  }
}

App.propTypes = {
  initialWindowWidth: PropTypes.number.isRequired,
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
export default reduxWrapper.withRedux(App)
