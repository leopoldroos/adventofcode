import { withRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'
import YearDay from '@/components/organisms/YearDay'
import Text from '@/components/atoms/Text'
import Layout from '@/components/molecules/Layout'

const DayPage = ({ day, year }) => (
  <Layout data-cy="day-page">
    <Text as="h1">The year and day to solve:</Text>
    <Text as="h3">
      {year} - {day}
    </Text>
    <YearDay year={year} day={day} />
  </Layout>
)

DayPage.getInitialProps = async (ctx) => {
  const { query = {} } = ctx
  const { day, year } = query
  return { day, year }
}

DayPage.propTypes = {
  day: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
}
export default withRouter(DayPage)
