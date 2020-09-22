var app = new Vue({
	el: "#app",
	data: {
		year: new Date().getFullYear(),
		projects: []
	},
	created() {
		fetch("projects.json")
			.then(res => res.json())
			.then(json => {
				this.projects = json.projects;
			});
	}
});
