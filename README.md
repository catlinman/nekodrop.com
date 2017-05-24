
# nekodrop.com #

Landing page for the Nekodrop server network.

# Summary #

This page acts as a landing for anyone visiting the base Nekodrop server. The
idea is page will ping the master server which will return an array of servers
in the network and show their availability on this page. Each time a ping is
performed a circlular drop expands in the background.

The page runs on a rather simple nginx setup. The configuration files are
included in the *private/nginx* directory.

# License #

This repository is released under the MIT license. For more information please
refer to
[LICENSE](https://github.com/catlinman/nekodrop.com/blob/master/LICENSE)
