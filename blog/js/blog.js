/* helper functions */
function get(url, json) {
  var response = await fetch(url);

  if (response.ok) { // if HTTP-status is 200-299
    var data;
    if (json) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    return data;
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}


/* main blog system */
if (mode == "postsearch") {
  /* get list of posts */
  var posts = await get("posts.json", true);
  /* get posts */
  for (post of posts) {
    get("posts/" + post.path, false);
  }
} else if (mode == "postveiw") {
  /* declare vars */
  var authorName;
  var authorImage;
  var postTitle;
  var postPath;
  var postdate;
  /* get list of posts */
  var posts = await get("posts.json", true);
  
  
}



/* parse markdown to html */
text = "";
converter = new showdown.Converter(),
html = converter.makeHtml(text);
