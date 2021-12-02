import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";

const StyledLink = styled.a`
  padding: 4px;
`;
const Year = styled.div``;

const thisYear = new Date().getYear() + 1900;
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Advent of code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Advent of code!</h1>
        {[...new Array(thisYear - 2019)].map((_, i) => {
          const year = thisYear - i;
          return (
            <Year key={year}>
              {year}:
              {[...new Array(24)].map((_, day) => (
                <Link key={day} href={`/${year}/${day + 1}`} passHref>
                  <StyledLink>{day + 1}</StyledLink>
                </Link>
              ))}
            </Year>
          );
        })}
      </main>
      <footer>Powered by Leo</footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .title {
          color: #0070f3;
          text-decoration: none;
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
