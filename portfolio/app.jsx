function Header() {
  return (
    <header>
    
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
    <React.Fragment>
      <Header />
      <ProjectCards />
      <Footer />
    </React.Fragment>
  )
}


ReactDOM.render(<App />, document.getElementById("treeleg"));
