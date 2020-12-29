var outlinrData = {
  "general": {},
  "notes": {
    "value": ""
  },
  "todos": {}
}
function updateStorage(){
  var storage = window.localStorage;
  storage.setItem("outlinr", JSON.stringify(outlinrData));
  return "Storage is now: '" + JSON.stringify(outlinrData) + "'.";
}
function loadStorage(){
  var storage = window.localStorage;
  outlinrStorageData = JSON.parse(storage.getItem("outlinr"));
  if (outlinrStorageData == null) {
    updateStorage();
    return "Nothing in storage. Setting to current text value...";
  } else{
    outlinrData = outlinrStorageData;
    return "Loaded '" + JSON.stringify(outlinrData) + "' from storage";
  }
}
function setupRoutes(){
  if (location.hash == ""){
      location.hash = "notes";
  }
  window.addEventListener("hashchange", function(E){
    console.log("Hash changed!")
  });
  location.hash = "home";
}
function setupTextarea(){
  var textEl = document.getElementById("notes-input");
  textEl.value = outlinrData.notes.value;
  textEl.addEventListener("keyup", function(){
    outlinrData.notes.value = textEl.value;
    updateStorage();
  });
  return "Text area set up!";
}
function setupShortcuts(){
  Mousetrap.bind(['meta+s', 'ctrl+s'], function(e) {
    e.preventDefault();
    updateStorage();
    alert("You don't need to save :) - Outlinr saves in your browser automatically!");
  });
}
function exportData() {
  updateStorage();
  copyTextToClipboard(JSON.stringify(outlinrData));
  alert("Data copied to clipboard!")
}
function setup(){
  loadStorage();
  setupRoutes();
  setupTextarea();
  setupShortcuts();
  return "Setup complete!";
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});

/* random helper functios */
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
