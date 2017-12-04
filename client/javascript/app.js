import React from 'react'
import ReactDOM from 'react-dom'
import DayContainer from './components/day_container.jsx'

const day = parseInt(window.location.pathname.split('/').pop(), 10)

ReactDOM.render(
  <DayContainer day={day} />,
  document.getElementById('data-react-root')
)
