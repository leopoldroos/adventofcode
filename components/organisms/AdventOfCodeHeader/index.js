import { withRouter } from 'next/router'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import { useRouter } from 'next/router'

const Head = styled.nav`
  padding: 4px;
  top: 0;
  left: 0;
  right: 0;
  background-color: #456;
`
const Years = styled.p`
  display: flex;
  width: 100%;
`
const Days = styled.p`
  display: flex;
  width: 100%;
  overflow: auto;
  scrollbar-width: none; /* Firefox implementation */
`

const Year = styled(Button.DefaultButton)`
  margin-right: 4px;
  padding: 10px;
  cursor: pointer;
  ${({ selected }) => {
    return selected ? 'background-color: #999; border: 1px solid yellow;' : ''
  }}
`
const Day = styled(Button.DefaultButton)`
  margin-right: 4px;
  padding: 10px;
  cursor: pointer;
  ${({ selected }) => {
    return selected ? 'background-color: #999; border: 1px solid yellow;' : ''
  }}
`

const AdventOfCodeHeader = ({ day, year }) => {
  const years = ['2017', '2018', '2019', '2020'] // TODO: You lazy b*tch!
  const days = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24'.split(
    ','
  ) // TODO: You lazy b*tch!

  const router = useRouter()
  const selectYear = (newYear) => {
    console.log('click')
    router.push(`/${newYear}/${day}`)
  }

  const selectDay = (newDay) => {
    router.push(`/${year}/${newDay}`)
  }
  return (
    <Head>
      <Years>
        {years.map((y) => (
          <Year
            key={y}
            selected={year === y}
            onClick={() => selectYear(y)}
            label={y}
          />
        ))}
      </Years>
      <Days>
        {' '}
        {days.map((d) => (
          <Day
            key={d}
            selected={d === day}
            onClick={() => selectDay(d)}
            label={d}
          />
        ))}
      </Days>
    </Head>
  )
}

AdventOfCodeHeader.getInitialProps = async (ctx) => {
  const { query = {} } = ctx
  const { day, year } = query
  return { day, year }
}

AdventOfCodeHeader.propTypes = {
  day: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
}
export default withRouter(AdventOfCodeHeader)
