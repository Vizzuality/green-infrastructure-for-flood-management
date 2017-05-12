import numeral from 'numeral';

function setNumberFormat(number) {
  // const numLen = `${number}`.length;
  // const type = numLen < 7 ? '0,0' : '0.0a';

  return numeral(number).format('0.0a');
}

function saveAsFile(fileUrl, fileName) {
  const a = document.createElement('a');
  a.href = fileUrl;
  a.style.display = 'none';
  a.download = fileName;
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
}

function isDevice() {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(navigator.userAgent);
}

export { setNumberFormat, saveAsFile, isDevice };
