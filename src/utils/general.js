import { format } from 'd3-format';

function setNumberFormat(number) {
  const letterformat = format(".2s");
  const thousand = format(",");
  const numLen = `${number}`.length;
  let result = number;

  if (numLen > 9) {
    result = letterformat(number).replace('G', 'b');
  } else if (numLen > 6) {
    result = letterformat(number).replace('M', 'm');
  } else if (numLen > 3) {
    result = thousand(number);
  }

  return result;
}

export { setNumberFormat };
