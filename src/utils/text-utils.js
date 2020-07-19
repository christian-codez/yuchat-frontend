export const shortenString = (string, length) => {
  const strLength = string.length;
  const subString = string.substring(0, length);

  return strLength > length ? subString + ' ...' : subString;
};
