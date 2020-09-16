const worker = Tesseract.createWorker();

async function recognizeImage() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(file, document.getElementById("imageinput").val());
  dealWithTextData(text);
  await worker.terminate();
}

function dealWithTextData(text){
  console.log(text);
}

await recognizeImage()
