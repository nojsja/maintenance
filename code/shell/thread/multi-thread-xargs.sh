#/bin/bash

all_num=10
thread_num=5

a=$(date +%H%M%S)

seq 1 ${all_num} | xargs -n 1 -I {} -P ${thread_num} sh -c "sleep 1;echo {}"

b=$(date +%H%M%S)

echo -e "startTime:\t$a"
echo -e "endTime:\t$b"
