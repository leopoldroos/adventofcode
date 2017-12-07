const applyNames = (parent, names, arrangedPrograms) => {
  names.forEach(name => {
    arrangedPrograms[name] = parent
  })
  return arrangedPrograms
}

export default (programs, withATwist) => {
  let arrangedPrograms = {}

  let parents = programs.filter(program => program.childNames)


  parents.forEach(parent => {
    let mainParent = programs.find(program => parents.childNames.includes(parent.name))
  })
    




  programs.forEach(program => {
    if (!program.childNames) {
      arrangedPrograms[program.name] = program.weight
    }
  })

  programs.forEach(program => {
    if (program.childNames) {
      arrangedPrograms = applyNames(program.name, program.childNames, arrangedPrograms)
    }
  })

  let parents = programs.filter(program => program.childNames)

  for (let i = 0; i < parents.length; i++) {
    let parent = parents[i]
    parent.childNames
  }
  console.log({orphans})
  return arrangedPrograms
}
/*
a   e   g
b   e   g
c   f   g
d   f   g
*/
