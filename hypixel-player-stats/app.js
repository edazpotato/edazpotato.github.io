async function getPlayerUUID(playerName) {
  let url = "https://api.mojang.com/users/profiles/minecraft/"+playerName;
  let response = await fetch(url, "jsonp");

  if (response.ok) {
    let json = await response.json();
    return json.id;
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}
async function getHyixelPlayerStats(uuid, key) {
  let url = "https://api.hypixel.net/player?";
  url += "uuid="+uuid;
  url += "&";
  url += "key="+key;
  let response = await fetch(url, "jsonp");

  if (response.ok) {
    let json = await response.json();
    return json.id;
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}

let name  = "EdazPotato";
let uuid = getPlayerUUID(name);
console.log(uuid);
