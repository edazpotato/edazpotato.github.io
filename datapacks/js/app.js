var app = new Vue({
	el: "#app",
	data: {
		year: new Date().getFullYear(),
		packs: []
	},
	created() {
		fetch("packs.json")
			.then(res => res.json())
			.then(json => {
				this.packs = json.packs;
			});
	}
});