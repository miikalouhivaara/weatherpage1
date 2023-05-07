function calculateStatistics(data) {
    const last20Values = data.slice(-20);
    const mean = last20Values.reduce((acc, curr) => acc + curr, 0) / last20Values.length;
    const sortedValues = last20Values.slice().sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0 ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2 : sortedValues[Math.floor(sortedValues.length / 2)];
    const modeMap = {};
    let maxCount = 1;
    let mode = null;
    last20Values.forEach((value) => {
      if (modeMap[value] === undefined) {
        modeMap[value] = 1;
      } else {
        modeMap[value]++;
      }
      if (modeMap[value] > maxCount) {
        maxCount = modeMap[value];
        mode = value;
      }
    });
    const range = Math.max(...last20Values) - Math.min(...last20Values);
    const variance = last20Values.reduce((acc, curr) => acc + (curr - mean) ** 2, 0) / last20Values.length;
    const standardDeviation = Math.sqrt(variance);
    return { mean, median, mode, range, standardDeviation };
  }
  