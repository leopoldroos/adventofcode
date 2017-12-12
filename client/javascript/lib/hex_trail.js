const getStepsAway = (organizedTrail) => {
  let reducedTrail = Object.assign({}, organizedTrail)

    // ne vs sw cancels each other
  if (reducedTrail.ne > reducedTrail.sw) {
    reducedTrail.ne -= reducedTrail.sw
    reducedTrail.sw = 0
  } else {
    reducedTrail.sw -= reducedTrail.ne
    reducedTrail.ne = 0
  }

    // nw vs se cancels each other
  if (reducedTrail.nw > reducedTrail.se) {
    reducedTrail.nw -= reducedTrail.se
    reducedTrail.se = 0
  } else {
    reducedTrail.se -= reducedTrail.nw
    reducedTrail.nw = 0
  }

    // ne & nw is replaced by n
  if (reducedTrail.ne > reducedTrail.nw) {
    reducedTrail.n += reducedTrail.nw
    reducedTrail.ne -= reducedTrail.nw
    reducedTrail.nw = 0
  } else {
    reducedTrail.n += reducedTrail.ne
    reducedTrail.nw -= reducedTrail.ne
    reducedTrail.ne = 0
  }

    // se & sw is replaced by s
  if (reducedTrail.se > reducedTrail.sw) {
    reducedTrail.s += reducedTrail.sw
    reducedTrail.se -= reducedTrail.sw
    reducedTrail.sw = 0
  } else {
    reducedTrail.s += reducedTrail.se
    reducedTrail.sw -= reducedTrail.se
    reducedTrail.se = 0
  }

    // n vs s cancels each other
  if (reducedTrail.n > reducedTrail.s) {
    reducedTrail.n -= reducedTrail.s
    reducedTrail.s = 0
  } else {
    reducedTrail.s -= reducedTrail.n
    reducedTrail.n = 0
  }

  let nrOfNorthSteps = (reducedTrail.n + reducedTrail.ne + reducedTrail.nw) - (reducedTrail.s + reducedTrail.se + reducedTrail.sw)
  let nrOfEastSideSteps = (reducedTrail.ne + reducedTrail.se) - (reducedTrail.nw + reducedTrail.sw)
  let stepsAway = Math.max(Math.abs(nrOfNorthSteps), Math.max(nrOfEastSideSteps))
  console.log({reduced: JSON.stringify(reducedTrail), original: JSON.stringify(organizedTrail), stepsAway})
  return {organizedTrail, reducedTrail, nrOfEastSideSteps, nrOfNorthSteps, stepsAway}
}

export const followTrail = (trail) => {
  let organizedTrail = {n: 0, ne: 0, nw: 0, s: 0, se: 0, sw: 0}
  trail.split(',').forEach(step => organizedTrail[step]++)
  let {reducedTrail, nrOfEastSideSteps, nrOfNorthSteps, stepsAway} = getStepsAway(organizedTrail)
  return {organizedTrail, reducedTrail, nrOfEastSideSteps, nrOfNorthSteps, stepsAway, trail}
}

export const furthestAwayInTrail = (trail) => {
  let furthestAway = 0
  for (let i = 1; i < trail.length; i++) {
    let organizedTrail = {n: 0, ne: 0, nw: 0, s: 0, se: 0, sw: 0}
    trail.slice(0, i).split(',').forEach(step => (organizedTrail[step] > -1) ? organizedTrail[step]++ : null)
    let {stepsAway} = getStepsAway(organizedTrail)
    furthestAway = Math.max(furthestAway, stepsAway)
    console.log({furthestAway})
  }

  return furthestAway
}
