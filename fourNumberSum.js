let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0
let numberOfElements = 0
let targetSum = 0

rl.on('line', function (line) {

  if (lineIndex == 0) {

    numberOfElements = parseInt(line)

  } else if (lineIndex == 1) {

    targetSum = parseInt(line)

  } else {

    const array = line.split(' ').map(el => el * 1).sort((a, b) => a - b)

    const allQuadruplets = fourNumberSum(array, targetSum)

    const filteredQuadruplets = Array.from(new Set(allQuadruplets.map(JSON.stringify)), JSON.parse)

    console.log(filteredQuadruplets.length)

    filteredQuadruplets.forEach(quadruplet => {
      console.log(quadruplet.join(" "))
    })

    rl.close()

    return

  }

  lineIndex += 1

})

function fourNumberSum(array, targetSum) {
  allPairSums = {}
  quadruplets = []

  for (let i = 1; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const currentSum = array[i] + array[j]
      const difference = targetSum - currentSum
      if (allPairSums[difference] != null) {
        allPairSums[difference].forEach(pair => {
          const newQuadruplet = pair.concat([array[i], array[j]]).sort((a, b) => a - b)
          if (!quadruplets.includes(newQuadruplet)) {
            quadruplets.push(newQuadruplet)
          }
        })
      }
    }

    for (let k = 0; k < i; k++) {
      const currentSum = array[i] + array[k]
      if (allPairSums[currentSum] == null) {
        allPairSums[currentSum] = [[array[k], array[i]]]
      } else {
        allPairSums[currentSum].push([array[k], array[i]])
      }
    }
  }

  return quadruplets.sort(
    ([a, b, c, d], [h, i, j, k]) =>
      a.toString() - h.toString() ||
      b.toString() - i.toString() ||
      c.toString() - j.toString() ||
      d.toString() - k.toString()
  )
}