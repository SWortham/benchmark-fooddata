# Warmup phase
curl -I http://127.0.0.1:3000/food/331358
curl -I http://127.0.0.1:3000/search/nutrients/1005:0.5-200.0

# Run the benchmark against 3 URLs
oha -z 2s -c 100 -q 50000 --latency-correction --disable-keepalive http://127.0.0.1:3000/food/321358
oha -z 2s -c 100 -q 50000 --latency-correction --disable-keepalive http://127.0.0.1:3000/search/nutrients/1005:0.1-0.1
oha -z 2s -c 100 -q 50000 --latency-correction --disable-keepalive http://127.0.0.1:3000/search/nutrients/1005:0.5-200.0
