const buildChildrenForProgram = (childNames, programsInStruct) => {
  let children = []
  let sumOfChildWeights = 0
  childNames.forEach(childName => {
    const program = programsInStruct[childName]
    // sumOfChildWeights += program.weight
    let child = {
      name: program.name,
      weight: program.weight,
      children: false,
      sumOfChildWeights: 0
    }
    if (program.childNames) {
      let subChildren = buildChildrenForProgram(program.childNames, programsInStruct)

      child.children = subChildren.children
      child.sumOfChildWeights = subChildren.sumOfChildWeights + program.weight

      sumOfChildWeights += subChildren.sumOfChildWeights
    } else {
      sumOfChildWeights += program.weight
    }
    children.push(child)
  })

  return {children, sumOfChildWeights}
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
    weight: mainParent.weight
  }
  let subChildren = buildChildrenForProgram(mainParent.childNames, programsInStruct)
  arrangedPrograms.children = subChildren.children
  arrangedPrograms.sumOfChildWeights = subChildren.sumOfChildWeights

  return arrangedPrograms
}

export const balanceTower = (tower, programsInStruct) => {
  return -1
}
