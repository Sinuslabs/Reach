#!/bin/bash -eu

source ../../info.env

# Start total execution time measurement with nanosecond precision
overall_start=$(date +%s.%N)

# update repository
# git pull

./compile.sh && ./package.sh && ./upload.sh

# End total execution time measurement and print
# End total execution time measurement
overall_end=$(date +%s.%N)

# Calculate the duration in seconds with millisecond precision
duration=$(echo "$overall_end - $overall_start" | bc)
echo "Total execution time: $duration s."

