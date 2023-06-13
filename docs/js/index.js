// Make a GET request to a specified path on this domain.
function doGET(path, callback) {
    var xhr = new XMLHttpRequest();

    // Prepare the callback.
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);

            } else {
                callback(null);
            }
        }
    };

    // Make a GET request with a cache buster.
    xhr.open("GET", path + "?cache=" + (Math.random() * 1000000));
    xhr.send();
}

// Make requests to the servers in the network and spawn a wave.
function getStatus() {
    doGET("data", function(fileData) {
        // If no data is present, exit.
        if (fileData == null || fileData == "") return;

        // Split site data by the specified symbol.
        var servers = fileData.split(";");

        // Splice the first item and check if it is the data format.
        if (dataheader = servers.splice(0, 1)[0] !== "data") return;

        // Splice the next item out since it's the timestamp.
        var datatime = servers.splice(0, 1)[0];

        // Iterate over servers and their data.
        for (var i = 0; i < servers.length; i++) {
            // Site data has a field for the server name and status. Split these.
            var serverInfo = servers[i].split(":");

            // If no site name is present we can skip this loop.
            if (serverInfo[0] == "") continue;

            // Attempt to get the element in which information is presented.
            var field = document.getElementById(serverInfo[0]);

            // Create the HTML for the server link.
            var serverHTML = "<a href=\"https://" + serverInfo[0] + "\">" + serverInfo[0] + "</a>";

            // If it exists we simply overwrite previous information.
            if (field != null) {
                field.getElementsByTagName("h5").innerHTML = serverHTML;
                field.getElementsByTagName("p").innerHTML = "Status " + serverInfo[1].match(/\d{3}/);

            } else {
                // Create a new section for the site and tag it correctly.
                field = document.createElement("div");
                field.id = serverInfo[0];
                field.classList.add("site");

                // Create an element for the server name.
                siteURL = document.createElement("h5");
                siteURL.innerHTML = serverHTML;

                // Create an element for the site status.
                serverStat = document.createElement("p");

                // If no information is present this means that there was no connection.
                if (serverInfo[1] == "") {
                    serverStat.innerHTML = "Connection failed"

                } else {
                    serverStat.innerHTML = "Status " + serverInfo[1].match(/\d{3}/);
                }

                // Append the new elements.
                field.appendChild(siteURL);
                field.appendChild(serverStat);

                // Insert them into the main node.
                document.getElementById("data").appendChild(field);
            }
        }

        // Attempt to fetch the timestamp element.
        var timestamp = document.getElementById("timestamp")

        // Edit the text if the element exists.
        if (timestamp != null) {
            timestamp.innerHTML = "Last fetch: " + datatime.replace(/_/g, " ") + " UTC";

        } else {
            var timestamp = document.createElement("p");
            timestamp.id = "timestamp";

            timestamp.innerHTML = "Last fetch: " + datatime.replace(/_/g, " ") + " UTC";

            document.getElementById("data").appendChild(timestamp);
        }

        // Start the wave if data was received.
        startWave();
    });
}


// Make a request and start a wave every 60 seconds.
window.setInterval(function() {
    getStatus();
}, 60000);

// Run when all elements are loaded.
window.onload = function() {
    getStatus();
}
