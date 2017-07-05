
# nekodrop.com #

Landing page for the Nekodrop server network.

# Summary #

This page acts as a landing for anyone visiting the base Nekodrop server. The
idea is page will ping the master server which will return an array of servers
in the network and show their availability on this page. Each time a ping is
performed a circlular drop expands in the background.

The page runs on a rather simple nginx setup. The configuration files are
included in the *private/nginx* directory.

For the real time updating part of the page you will have to run the *data.sh*
script in the *private* directory in intervals. You can use any job scheduler
you prefer for this. On the site the interval is set to one minute between
executions. It should be noted that you have to set the right execution
permissions on the shell file for it to run.

Inside the file are also the end points for connections. Adding new ones is
fairly easy since the process is commented in the script.

# License #

This repository is released under the MIT license. For more information please
refer to
[LICENSE](https://github.com/catlinman/nekodrop.com/blob/master/LICENSE)
