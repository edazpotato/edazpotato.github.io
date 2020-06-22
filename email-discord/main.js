function discordSignIn() {
	console.warn("");
	console.log("Does nothing yet");
	console.warn("");
}
function googleSignIn() {
  var base_provider = new firebase.auth.GoogleAuthProvider();
  
  // make the popup
  firebase.auth().signInWithPopup(base_provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log("Google apis token: " + token)
    console.log("Userdata : \n" + JSON.stringify(user))
	
	if (user.isAnonymous == false && user.emailVerified == true) {
		console.warn("");
		console.log("User '" + user.displayName + "' has a verified email of '" + user.email + "'");
		console.warn("");
	} 
	updatePageWithGoogleUserData(user);
	  
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    console.error("ERROR: '" + errorCode + "' - '" + errorMessage + "' for user '" + email + "'.\nfirebase.auth.AuthCredential used: '" + credential + "'")
  });
}

function updatePageWithGoogleUserData(user) {
	var el = document.getElementById("googleUserContainer")
	var imgEl = document.createElement("img");
	imgEl.setAttribute("src", user.photoURL);
	el.appendChild(imgEl);
	var text = document.createTextNode("Signed in as: " + user.displayName);
	var textEl = document.createElement("p");
	textEl.appendChild(text);
	el.appendChild(textEl);
	
}