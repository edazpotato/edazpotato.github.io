/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
function loadAndUpdate() {
    function formatUnixTime(unix_timestamp){
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    function updateElements(data) {
        document.getElementById("launchSiteName").innerText = data.launch_site.site_name_long;
        document.getElementById("flightNumber").innerText = data.flightNumber;
        var formattedTime = formatUnixTime(data.launch_date_unix);
        
        document.getElementById("flightDate").innerText = formattedTime;
        
    }
    //somehing
    getJSON("https://api.spacexdata.com/v3/launches/next", (err, data) => {
        if (err !== null) {
            console.error("Something went wrong: " + err);
        } else {
            updateElements(data);
        }
    });
};
window.addEventListener("load", () => {
    loadAndUpdate();
});
