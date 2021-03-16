module.exports = array => {
  if (!array || !array.length) { return; }

  let currentSum, maximumSum;

  // Set the starting sum as the first number
  currentSum = maximumSum = array.shift();

  array.forEach(num => {
    currentSum = Math.max(currentSum + num, num);
    maximumSum = Math.max(currentSum, maximumSum);
  });

  return maximumSum;
};
