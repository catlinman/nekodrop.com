// Object containing network sites and their information.
var sites = {
    alpha: {
        name: "alpha.nekodrop.com",
        url: "https//alpha.nekodrop.com"
    },
};

// Make a header request and get the return status.
function headRequest(url, callback) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url);
    http.onreadystatechange = function() {
        if (this.readyState == this.DONE) {
            callback(this.status);
        }
    };

    http.send();
}

// Make requests to the servers in the network and spawn a wave.
function getStatus() {
    startWave();

    for (id in sites) {
        headRequest(sites[id].url, function(response) {
            var field = document.getElementById(id)

            if (field != null) {
                field.innerHTML = sites[id].name + ": " + response;

            } else {
                field = document.createElement("h5");
                field.id = id;
                field.innerHTML = sites[id].name + ": " + response;

                document.getElementById("connections").appendChild(field);
            }
        });
    }
}

// Make a request and start a wave every 30 seconds.
window.setInterval(function() {
    // getStatus();
}, 30000);

// Run when all elements are loaded.
window.onload = function() {
    // getStatus();
}
