function waitSync(ms) {
	/* from http://www.endmemo.com/js/pause.php */
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
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
	},
	beforeMount() {
		waitSync(5000);
	}
});
