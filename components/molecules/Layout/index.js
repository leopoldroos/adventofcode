import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Head from "next/head";
import styled, { css } from "styled-components";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

const Main = styled.main`
  outline: none;
  ${({ menuVisibility, navIsAnimating, headerHeight }) =>
    (menuVisibility || (!menuVisibility && navIsAnimating)) &&
    css`
      margin-top: ${headerHeight}px;
      ${({ theme }) => theme.media.lg`
        margin-top: 0;
      `}
    `}
`;

const Layout = ({ children, className }) => {
  const { menuVisibility, navIsAnimating, headerHeight } = useSelector(
    (state) => state.navigation
  );
  const seo = "SEO yeay";
  return (
    <>
      {seo && (
        <Head>
          <title>{seo}</title>
        </Head>
      )}
      <Header />
      <Main
        className={className}
        menuVisibility={menuVisibility}
        navIsAnimating={navIsAnimating}
        headerHeight={headerHeight}
      >
        {children}
      </Main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  children: undefined,
  className: "",
};
Layout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Layout;
