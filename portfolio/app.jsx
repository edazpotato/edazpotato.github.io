function Header() {
  return (
    <header className="flex flex-col justify-center text-center">
      <h1 className="text-3xl">Things that I've made</h1>
      <h6 className="text-sm text-black sm:text-gray-600 text-opacity-80 sm:text-opaciy-100">AKA my portolio</h6>
    </header>
  )
}

function Footer() {
  return (
    <footer>
    
    </footer>
  )
}

function ProjectCard(props) {
  var data = props.data;
  return (
    <section className="flex flex-row text-left justify-start">
      <img />
    </section>
  )
}

function ProjectCards() {
  var projects = fetch("projects.json").then(function(res){res.json();}).then(function(json){return json.projects});
  return (
    <main className="h-full flex flex-row flex-wrap justify-center p-4">
    
    </main>
  )
}

function App() {
  return (
    <section className="font-sans">
      <Header />
      <ProjectCards />
      <Footer />
    </section>
  )
}


ReactDOM.render(<App />, document.getElementById("treeleg"));
