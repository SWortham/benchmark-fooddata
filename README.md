The purpose of this project is to benchmark five runtimes against each other to determine which is fastest. The idea is to take a real-world scenario that involves working with 5MB of in-memory collections, a REST API, and returning a lot of JSON.

# The runtimes
- Bun
- C#
- Go
- Node.js
- Python

Each application above has the same endpoints running on the same food-data.json file. Each application loads data into memory when they start up. The time to load the data into memory is not included in the benchmark.

The endpoints are as follows:
1. /food/{fdcid} - Lookup food and return all related nutrition information. Utilizes a hashtable/dictionary/map. Time complexity: O(1)
2. /search/nutrients/{nutrients} - Lookup matching foods by nutrient range where nutrients is of format "1005:0.5-200.0". Return an array of fdcid numbers for matching foods. Time complexity: O(log n)

# To start an application above

1. You will need Docker installed and running. 
2. Run the `./restart-service.sh` script. This will stop any and all of the 5 Docker applications already running and then prompt you to specify an application to start.
3. After the application starts up you should be able to browse to http://127.0.0.1:3000/food/321358 to prove that it's working.

# To run the benchmark against the application running on port 3000

1. Install Rust
2. `cargo install oha`
3. `./benchmark.sh`