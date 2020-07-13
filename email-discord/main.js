/* global vars */
var emailExt = "@wc.school.nz";
var userData = {
	email: "",
	discordId: ""
}

/* helper functions */
function hide(el) {
	el.setAttribute("disabled", "");
	el.classList.add("v-btn--disabled");
}
function show(el) {
	el.removeAttribute("disabled");
	el.classList.remove("v-btn--disabled");
}
function shout(msg) {
	console.warn("");
	console.log(msg);
	console.warn("");
}
function makeError(msg) {
	
}

/* do database stuff */
function databaseStuff(data) {
	db.collection("users").get().then((querySnapshot) => {
	    querySnapshot.forEach((doc) => {
		if (doc.discordId == data.discordId) {
			console.error("ERORR: That discord user has alredy been authenticated!");
			alert("ERORR: That discord user has alredy been authenticated!");
		} else if (doc.email == data.email) {
			console.error("ERORR: That email adress has alredy been authenticated!");
			alert("ERORR: That email adress has alredy been authenticated!");
		} else {
			// Add a second document with a generated ID.
			db.collection("users").add({
			    email: data.email,
			    discordId: data.discordId
			})
			.then(function(docRef) {
			    console.log("Document written with ID: ", docRef.id);
			})
			.catch(function(error) {
			    console.error("Error adding document: ", error);
			});
		}
	    });
	});
}

/* google sign in */
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
		shout("User '" + user.displayName + "' has a verified email of '" + user.email + "'")
		if (user.email.endsWith(emailExt)) {
			shout("Email ends with '" + emailExt + "'. Done!");
			userData.email = user.email;
			updatePageWithGoogleUserData(user);
			databaseStuff(userData);
		} else {
			console.error("Error: email adress does not end with '" + emailExt + "'");
			makeError("Email doesn't end with '" + emailExt + "'");
			alert("Error: email adress does not end with '" + emailExt + "'")
		}
	} 
	  
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
	var el = document.getElementById("googleUserContainer");
	var imgEl = document.createElement("img");
	imgEl.setAttribute("src", user.photoURL);
	imgEl.setAttribute("title", user.email);
	el.appendChild(imgEl);
	var text = document.createTextNode("Signed in with google as: " + user.displayName);
	var textEl = document.createElement("p");
	textEl.appendChild(text);
	el.appendChild(textEl);
	var googleBtn = document.getElementById("googleBtn");
	hide(googleBtn);
}

/* discord sign in */
function discordSignIn() {
	console.warn("");
	console.log("Does nothing yet");
	console.warn("");
	var discordBtn = document.getElementById("discordBtn");
	hide(discordBtn);
	var googleBtn = document.getElementById("googleBtn");
	show(googleBtn);
	userData.id = "";
}
