URL1=http://127.0.0.1:3000/food/321358
URL2=http://127.0.0.1:3000/search/nutrients/1005:0.1-0.1
URL3=http://127.0.0.1:3000/search/nutrients/1005:0.5-200.0
MAX_QPS=10000
MAX_CONNECTIONS=50

# Warmup phase
curl -I $URL1
curl -I $URL2
curl -I $URL3

echo "RUNNING BENCHMARKS..."

# Run the benchmark against 3 URLs
echo ""
echo "$URL1 ..................."
oha -z 2s -c $MAX_CONNECTIONS -q $MAX_QPS --latency-correction --disable-keepalive $URL1

echo ""
echo "$URL2 ..................."
oha -z 2s -c $MAX_CONNECTIONS -q $MAX_QPS --latency-correction --disable-keepalive $URL2

echo ""
echo "$URL3 ..................."
oha -z 2s -c $MAX_CONNECTIONS -q $MAX_QPS --latency-correction --disable-keepalive $URL3
