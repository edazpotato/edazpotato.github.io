const navbarDiv = document.getElementsByClassName("topnav")[0];
var items = [
  {
    "name": "home",
    "link": "/"
  },
  {
    "name": "MEME's from reddit",
    "link": "/MEMES"
  },
  {
    "name": "Cats!",
    "link": "/CATS"
  },
  {
    "name": "Pictures from NASA",
    "link": "/NASA"
  },
  {
    "name": "Today's XKCD",
    "link": "/XKCD"
  },
  {
    "name": "Next SpaceX launch",
    "link": "/SPACEX"
  }
];
var navbar = "";
for (const item of items) {
  navbar = navbar + "\n<a href=\""item.link"\">"item.name"</a>";
}
navbarDiv.innerHTML = navbar;

