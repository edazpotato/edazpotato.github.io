function Header() {
  return (
    <header className="flex flex-col justify-center text-center">
      <h1 className="text-3xl">Things that I've made</h1>
      <h6 className="text-xs text-gray-600">AKA my portolio</h6>
    </header>
  )
}

function Footer() {
  var year = new Date().getFullYear();
  return (
    <footer>
      Copyright Edazpotato {2020 || year}
    </footer>
  )
}

function ProjectCard(props) {
  var data = props.projData;
  return (
    <section className="flex flex-row text-left justify-start">
      <img src={data.icon_url} alt={data.title + " - image"} />
      <aside className="flex flex-row text-left justify-start">
        <h2><a href={data.url} target="_blank">{data.title}</a></h2>
        <p>{data.description}</p>
      </aside>
    </section>
  )
}

async function ProjectCards() {
  var projects;
  await fetch("projects.json").then((res) => res.json()).then((json) => {
    projects = json.projects;
  });
  var projectCardElements  = projects.map(function(project){
    <ProjectCard key={project.id} projData={project} />
  });
  return (
    <main className="h-full flex flex-row flex-wrap justify-center p-4">
      {projectCardElements}
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
