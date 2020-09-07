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
function setup(){
  if (location.hash == ""){
    location.hash = "notes";
  }
  loadStorage();
  setupTextarea();
  setupShortcuts();
  return "Setup complete!";
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
