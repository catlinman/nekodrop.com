#! /bin/bash

# Output data file location.
out="/var/www/nekodrop.com/public/data"

# Truncate the data file.
: > $out

# Site array. First part is the output name. Second the in point URL.
sites[0]="alpha.nekodrop.com;catlinman.com"

echo -n "data;$(date --utc +%F_%T);" >> $out # Insert data format and a timestamp into the file.

# Iterate over prepared sites.
for i in "${sites[@]}"; do
	n=0 # Reset the counter variable.

	# Split the input string.
	for j in $(echo $i | tr ";" "\n"); do
		((n++))

		# If this is the second element we make a request.
		if (( n == 2 )); then
			# Make a cURL request and get the response.
			curl --silent -I "https://$j" | grep "HTTP" | tr -d "\n" | tr -d "\r" >> $out

		else
			echo -n "$j:" >> $out
		fi
	done

	# Add a closing symbol.
	echo -n ";" >> $out
done
