module.exports = (value, precision) => {
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const factor   = Math.pow(10, precision > 0 ? precision : 2);
  let suffix   = 0;

  while (value >= 1024 && suffixes[++suffix] && suffix < suffixes.length) {
    value /= 1024;
  }

  if (suffix >= suffixes.length) {
    suffix = suffixes.length - 1;
  }

  // Return the number rounded to precision.
  return (Math.round(value * factor) / factor) + ' ' + suffixes[suffix];
};