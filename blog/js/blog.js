/* temp stuff */
var mode = "postview";

/* helper functions */
function get (url, json) {
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
function init() {
  /* main blog system */
  /* delcare vars */
  var markdown = "";
  
  if (mode == "postsearch") {
    /* get list of posts */
    var posts = await get("posts.json", true);
    /* get posts */
    for (post of posts) {
      get("posts/" + post.path, false);
    }
  } else if (mode == "postveiw") {
    /* get list of posts */
    var posts = await get("posts.json", true);
    var post = posts[{"id": id}];
    /* declare vars */
    var authorName = post.author;
    var authorImage = post.author_image_path;
    var postTitle = post.title;
    var postPath = post.path;
    var postdate = post.date; // NOTE: this is not a date object, just a string, because i'm lazy
    markdown = get("posts/" + postPath);
  }
  /* parse markdown to html */
  var converter = new showdown.Converter();
  var html = converter.makeHtml(markdown);
  var app = document.getElementById("app");
  app.appendChild(html);
}
