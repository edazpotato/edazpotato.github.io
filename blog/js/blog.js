/* temp stuff */
var mode = "postview";
var id = 0;
document.addEventListener('ready', () => {console.log("ready")});
document.addEventListener('load', () => {console.log("loaded")});

/* helper functions */
async function get (url, json) {
  console.log(0);
  var response = await fetch(url);
  console.log(1);
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
      tables: true,
      tasklists: true,
      simpleLineBreaks: true,
      emoji: true,
      underline: true
    }
    var converter = new showdown.Converter(options);
    var html = converter.makeHtml(markdown);
    return html;
}

/* main app */
async function init() {
  /* main blog system */
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
    console.log(2);
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
  app.innerHTML = "parse(markdown)";
}

init();
