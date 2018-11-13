#/bin/bash
all_num=10
thread_num=5
a=$(date +%H%M%S)
parallel -j 5 "sleep 1; echo {}" ::: `seq 1 10`
b=$(date +%H%M%S)
echo -e "startTime:\t$a"
echo -e "endTime:\t$b"
