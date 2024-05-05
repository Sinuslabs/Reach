#!/bin/bash -eu

source ../../info.env

# Start total execution time measurement with nanosecond precision
overall_start=$(date +%s.%N)

# update repository
git pull

sh compile.sh && sh test.sh && sh package.sh && sh upload.sh

# End total execution time measurement and print
# End total execution time measurement
overall_end=$(date +%s.%N)

# Calculate the duration in seconds with millisecond precision
duration=$(echo "$overall_end - $overall_start" | bc)
echo "Total execution time: $duration s."

# Notify the user that the package has been built
osascript -e "display notification \"${NAME} ${VERSION} has been successfully built.\" with title \"Build Complete\" sound name \"Submarine\""