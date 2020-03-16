function parseAllowed(allowed) {
  return allowed
    .split(/\r?\n/)
    .reduce((labels, line) =>
      labels
        .concat(line.split(","))
        .filter(label => label)
        .map(label => label.trim()),
      [])
}

function findMatching(labelNames, allowedLabels) {
  allowedLabels.forEach(allowedLabel => console.log(`allowedLabel.length for ${allowedLabel} is ${allowedLabel.length}`))
  const allowedLabelsSet = new Set(allowedLabels)
  const matchingLabels = labelNames.filter(labelName => {
    console.log(`labelName.length for ${labelName} is ${labelName.length}`)
    return allowedLabelsSet.has(labelName)
  })
  if (matchingLabels.length < 1) {
    throw new Error(
      `Could not find one of the appropriate labels on the PR. 
      Allowed labels: length ${allowedLabels.length}, ${allowedLabels}
      Present labels: length ${labelNames.length}, ${labelNames}
      Matching labels: length ${matchingLabels.length}, ${matchingLabels}`)
  }
  return matchingLabels[0]
}

module.exports = {parseAllowed, findMatching};
