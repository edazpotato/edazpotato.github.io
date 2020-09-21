"use strict";

function Header() {
  return /*#__PURE__*/React.createElement("header", {
    className: "flex flex-col justify-center text-center"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl"
  }, "Things that I've made"), /*#__PURE__*/React.createElement("h6", {
    className: "text-sm text-black sm:text-gray-600 text-opacity-80 sm:text-opaciy-100"
  }, "AKA my portolio"));
}

function Footer() {
  return /*#__PURE__*/React.createElement("footer", null);
}

function ProjectCard(props) {
  var data = props.data;
  return /*#__PURE__*/React.createElement("section", {
    className: "flex flex-row text-left justify-start"
  }, /*#__PURE__*/React.createElement("img", null));
}

function ProjectCards() {
  var projects = fetch("projects.json").then(function (res) {
    res.json();
  }).then(function (json) {
    return json.projects;
  });
  return /*#__PURE__*/React.createElement("main", {
    className: "h-full flex flex-row flex-wrap justify-center p-4"
  });
}

function App() {
  return /*#__PURE__*/React.createElement("section", {
    className: "font-sans"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(ProjectCards, null), /*#__PURE__*/React.createElement(Footer, null));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("treeleg"));
