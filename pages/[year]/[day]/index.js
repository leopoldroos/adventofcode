import { withRouter } from "next/router";
import React from "react"; // { useEffect }
// import PropTypes from "prop-types";
import styled from "styled-components";
import YearDay from "@/components/organisms/YearDay";
import Text from "@/components/atoms/Text";
import Layout from "@/components/molecules/Layout";
// import { getAdventOfCodeTask } from '@/services/serverside'
import AdventOfCodeHeader from "@/components/organisms/AdventOfCodeHeader";

const Title = styled(Text)``;
const Description = styled(Text)``;

const DayPage = ({ day, year }) => {
  const adventOfCodeLink = `https://adventofcode.com/${year}/day/${day}`; // TODO: fetch current status if its completed or not
  // useEffect(() => {
  //   const loadStars = async () => {
  //     const stars = await getAdventOfCodeTask({ day, year })
  //     console.log({ stars })
  //   }
  //   loadStars()
  // }, [])

  return (
    <Layout data-cy="day-page">
      <AdventOfCodeHeader
        // onSelectDay={({ year, day }) => {
        //   console.log('Day and Year is selected:', { day, year })
        // }}
        year={year}
        day={day}
      />
      <a href={adventOfCodeLink} target="_blank">
        {adventOfCodeLink}
      </a>
      <YearDay year={year} day={day} />
    </Layout>
  );
};

DayPage.getInitialProps = async (ctx) => {
  const { query = {} } = ctx;
  const { day, year } = query;
  return { day, year };
};

// DayPage.propTypes = {
//   day: PropTypes.string.isRequired,
//   year: PropTypes.string.isRequired,
// };
export default withRouter(DayPage);
