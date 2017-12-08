const buildChildrenForProgram = (childNames, programsInStruct) => {
  let children = []
  childNames.forEach(childName => {
    const program = programsInStruct[childName]

    let child = {
      name: program.name,
      weight: program.weight,
      children: [],
      sumOfChildWeights: 0
    }

    if (program.childNames) {
      child.children = buildChildrenForProgram(program.childNames, programsInStruct)
      child.children.forEach(subChild => (child.sumOfChildWeights += subChild.totalWeight))
    }
    child.totalWeight = child.weight + child.sumOfChildWeights
    children.push(child)
  })

  return children
}

export const buildTower = (programsInStruct, withATwist) => {
  let programsInArray = Object.keys(programsInStruct).map(name => programsInStruct[name])

  let parents = programsInArray.filter(program => program.childNames)
  let mainParent
  let found = false
  for (let i = 0; i < parents.length; i++) {
    let parent = parents[i]
    found = parents.find(program => program.childNames.includes(parent.name))
    if (!found) {
      mainParent = parent
      break
    }
  }

  const arrangedPrograms = {
    name: mainParent.name,
    weight: mainParent.weight,
    sumOfChildWeights: 0
  }

  arrangedPrograms.children = buildChildrenForProgram(mainParent.childNames, programsInStruct)
  arrangedPrograms.children.forEach(subChild => (arrangedPrograms.sumOfChildWeights += subChild.totalWeight))
  arrangedPrograms.totalWeight = arrangedPrograms.sumOfChildWeights + arrangedPrograms.weight

  return arrangedPrograms
}

let errorData
const checkDifferentWeight = (children) => {
  if (children[0].totalWeight !== children[1].totalWeight && children[0].totalWeight !== children[2].totalWeight) {
    errorData = {children, index: 0}
    throw new Error('Found different!')
  } else if (children[1].totalWeight !== children[0].totalWeight && children[1].totalWeight !== children[2].totalWeight) {
    errorData = {children, index: 1}
    throw new Error('Found different!')
  } else if (children[2].totalWeight !== children[0].totalWeight && children[2].totalWeight !== children[1].totalWeight) {
    errorData = {children, index: 2}
    throw new Error('Found different!')
  } else {
    for (let i = 3; i < children.length; i++) {
      if (children[i].totalWeight !== children[0].totalWeight) {
        errorData = {children, index: i}
        throw new Error('Found different!')
      }
    }
  }
  return true
}

let newWeight = 0
export const balanceTower = (tower) => {
  // console.log(tower)
  try {
    checkDifferentWeight(tower.children)
  } catch (err) {
    console.log('Found a diff!', errorData)

    const errorIndex = errorData.index
    const commonIndex = errorIndex === 0 ? 1 : 0
    const problemProgram = errorData.children[errorIndex]
    let diff = errorData.children[commonIndex].totalWeight - problemProgram.totalWeight
    newWeight = problemProgram.weight + diff

    balanceTower(problemProgram)
  }
  return newWeight
}
