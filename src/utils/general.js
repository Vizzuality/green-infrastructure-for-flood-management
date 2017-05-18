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

function toBase64(file, cb) {
  const reader = new FileReader();
  reader.onload = (event) => {
    cb && cb(event.target.result);
  };
  reader.readAsDataURL(file);
}

export { setNumberFormat, saveAsFile, toBase64 };
