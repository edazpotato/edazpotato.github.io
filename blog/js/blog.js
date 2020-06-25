/* temp stuff */
var mode = "postview";
var id = 0;

/* helper functions */
async function get (url, json) {
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
function parse(markdown) {
    /* parse markdown to html */
    var options = {
      parseImgDimensions: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tables, tasklists: true,
      simpleLineBreaks: true,
      emoji: true,
      underline: true
    }
    var converter = new showdown.Converter(options);
    var html = converter.makeHtml(markdown);
}

/* main app */
async function init() {
  /* main blog system */
  
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
    var post = posts.find(postId => postId === id);
    /* declare vars */
    var authorName = post.author;
    var authorImage = post.authuor_image_path;
    var postTitle = post.title;
    var postPath = post.path;
    var postdate = post.date; // NOTE: this is not a date object, just a string, because i'm lazy
    markdown = await get("posts/" + postPath, false);
  }
  var app = document.getElementById("app");
  app.innerHTML = parse(html);
}

init();
