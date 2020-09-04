var outlinrData = {
  "general": {},
  "notes": {
    "value": ""
  },
  "todos": {}
};
function updateStorage(){
  var storage = window.localStorage;
  storage.setItem("outlinr", JSON.stringify(outlinrData));
}
function loadStorage(){
  var storage = window.localStorage;
  outlinrStorageData = JSON.parse(storage.getItem("outlinr"));
  if (outlinrStorageData == null) {
    updateStorage();
  } else{
    outlinrData = outlinrStorageData;
  }
}
function setupTextarea(){
  TLN.append_line_numbers("#notes-input")
  var textEl = document.getElementById("notes-input");
  textEl.value = outlinrData.notes.value;
  textEl.addEventListener("keyup", function(){
    outlinrData.notes.value = textEl.value;
    updateStorage();
  });
}
function setup(){
  if (location.hash == ""){
    location.hash = "home";
  }
  loadStorage();
  setupTextarea();
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
