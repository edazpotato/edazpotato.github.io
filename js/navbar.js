const navbar = document.getElementById("navbar");
var items = [
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
  navbar += `<a href="${item.link}>${item.name}</a>"`;
}
