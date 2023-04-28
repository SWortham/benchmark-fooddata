There are benchmark applications for four runtimes:
- Bun
- C#
- Go
- Node.js

# To start an application above

1. You will need Docker installed and running. 
2. Run the `./restart-service.sh` script. This will prompt you to specify an application.
3. After the application starts up you should be able to browse to http://127.0.0.1:3000/food/321358 to prove that it's working.

# To run the benchmark against the application running on port 3000

1. `cd benchmark-runner`
2. `npm install` (if you haven't already done so)
3. `node index`