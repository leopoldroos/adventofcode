import React, { Component } from 'react'
import Day1 from 'components/days/1.jsx'
import Day2 from 'components/days/2.jsx'
// import Day3 from 'components/days/3.jsx'
// import Day4 from 'components/days/4.jsx'
// import Day5 from 'components/days/5.jsx'
// import Day6 from 'components/days/6.jsx'
// import Day7 from 'components/days/7.jsx'
// import Day8 from 'components/days/8.jsx'
// import Day9 from 'components/days/9.jsx'
// import Day10 from 'components/days/10.jsx'
// import Day11 from 'components/days/11.jsx'
// import Day12 from 'components/days/12.jsx'
// import Day13 from 'components/days/13.jsx'
// import Day14 from 'components/days/14.jsx'
// import Day15 from 'components/days/15.jsx'
// import Day16 from 'components/days/16.jsx'
// import Day17 from 'components/days/17.jsx'
// import Day18 from 'components/days/18.jsx'
// import Day19 from 'components/days/19.jsx'
// import Day20 from 'components/days/20.jsx'
// import Day21 from 'components/days/21.jsx'
// import Day22 from 'components/days/22.jsx'
// import Day23 from 'components/days/23.jsx'
// import Day24 from 'components/days/24.jsx'

export default class DayContainer extends Component {
  render () {
    const day = this.props.day

    switch (day) {
      case 1:
        return <Day1 />
      case 2:
        return <Day2 />
      default:
        return <div>{`No matching day (${day})`}</div>
    }
  }
}
