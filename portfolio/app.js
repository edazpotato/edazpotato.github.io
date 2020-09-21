"use strict";

function Header() {
  return /*#__PURE__*/React.createElement("header", {
    className: "flex flex-col justify-center text-center"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl"
  }, "Things that I've made"), /*#__PURE__*/React.createElement("h6", {
    className: "text-xs text-gray-600"
  }, "AKA my portolio"));
}

function Footer() {
  var year = new Date.getFullYear();
  return /*#__PURE__*/React.createElement("footer", null, "Copyright Edazpotato ", 2020 || year.toString());
}

function ProjectCard(props) {
  var data = props.projData;
  return /*#__PURE__*/React.createElement("section", {
    className: "flex flex-row text-left justify-start"
  }, /*#__PURE__*/React.createElement("img", {
    src: data.icon_url,
    alt: data.title + " - image"
  }), /*#__PURE__*/React.createElement("aside", {
    className: "flex flex-row text-left justify-start"
  }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("a", {
    href: data.url,
    target: "_blank"
  }, data.title)), /*#__PURE__*/React.createElement("p", null, data.description)));
}

function ProjectCards() {
  var projects = fetch("projects.json").then(function (res) {
    res.json();
  }).then(function (json) {
    return json.projects;
  });
  var projectCardElements = projects.map(function (project) {
    /*#__PURE__*/
    React.createElement(ProjectCard, {
      key: project.id,
      projData: project
    });
  });
  return /*#__PURE__*/React.createElement("main", {
    className: "h-full flex flex-row flex-wrap justify-center p-4"
  }, projectCardElements);
}

function App() {
  return /*#__PURE__*/React.createElement("section", {
    className: "font-sans"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(ProjectCards, null), /*#__PURE__*/React.createElement(Footer, null));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("treeleg"));
