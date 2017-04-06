import numeral from 'numeral';

function setNumberFormat(number) {
  const numLen = `${number}`.length;
  const type = numLen < 7 ? '0,0' : '0.0a';

  return numeral(number).format(type);
}

export { setNumberFormat };
