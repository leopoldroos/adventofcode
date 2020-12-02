import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import PageContentSpinner from '@/components/molecules/PageContentSpinner'
import { addErrorMessage } from '@/store/actions/errors'
import dynamic from 'next/dynamic'

const YearDay = ({ day, year }) => {
  const [ready, setReady] = useState(false)
  //   const [DynamicComponent, setDynamicComponent] = useState(false)
  const dispatch = useDispatch()
  dispatch(addErrorMessage('test'))

  //   let DynamicComponent
  //   useEffect(() => {
  //     // const loadComponent = async () => {
  //     try {
  //       //   const Day = dynamic(() => import(`./${year}/${day}`))
  //       dynamic(() => import(`../../atoms/Spinner`)).then((mod) => {
  //         console.log('day', mod)
  //         DynamicComponent = mod
  //         setReady(true)
  //       })
  //       // const Day = (await import(`./${year}/${day}`)).default
  //       // const tmp = new Day()
  //     } catch (e) {
  //       console.log('....', e)
  //       // Component = () => <p>Error?</p>
  //       // dispatch(addErrorMessage(e.message))
  //     }
  //     // }
  //     // loadComponent()
  //   }, [year, day, setReady, DynamicComponent])

  //   console.log({ DynamicComponent, ready })
  const DynamicComponent = dynamic(() => import(`./${year}/${day}`))
  return <DynamicComponent />
  return !DynamicComponent ? <PageContentSpinner /> : <DynamicComponent />
}

YearDay.propTypes = {
  day: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
}
export default YearDay
