# drugDictionnary

Collecting Drugs information scraping a website

1. You need to have node 12+ install
2. Open the file driectory in a new terminal
3. RUN: npm install to get modules dependencies
4. RUN: npm run dev

# Environmental variable

The variables available to modify are BASE_URL, which must be set to the page of the corresponding drug that we want to discard. And the TIME_REQUEST variable to make the program wait for each request it makes to the web. 

# Program steps

The program is asynchronous and will go through 3 functions one by one collecting the necessary data. When a single function completes, we'll see a console statement showing that the step was successful. At the end, the files will be created for each extracted drug. 

# Testing Steps

The program come witha unit test 'Jest' for testing each function with less work than the true one. 

1. You need to have node 12+ install
2. Open the file driectory in a new terminal
3. RUN: npm install to get modules dependencies
4. RUN: npm run test