import React from "react";
import { ThemeProvider } from "styled-components";
import PropTypes from "prop-types";
import Head from "next/head";
import theme from "@/components/themes";
import reduxWrapper from "@/store";

const App = ({ Component, pageProps }) => {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  const fetchPromises = [];
  if (Component.getInitialProps) {
    fetchPromises.push(Component.getInitialProps(ctx));
  }

  try {
    const fetchedData = await Promise.all(fetchPromises);
    if (ctx.res) {
      ctx.res.shouldCache = fetchedData.every((d) => d.successfulFetch);
    }
    const pageProps = fetchedData.pop() || {};
    return {
      pageProps,
    };
  } catch (e) {
    console.error(e, {
      context: "App.getInitialProps",
    });
    return {
      pageProps: {},
    };
  }
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
export default App; // reduxWrapper.withRedux(App);
