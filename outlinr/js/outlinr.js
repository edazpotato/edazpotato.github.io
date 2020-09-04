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
function setup(){
  if (location.hash == ""){
    location.hash = "home";
  }
  loadStorage();
  setupTextarea();
  return "Setup complete!";
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
