# tester-matching
This was an interview coding assignment for a company that matches clients with a network of software testers. The task was to read tester data from csv files and provide the best match for a client based on location and devices they specialize in.

## New Technologies Used
I used async on the server side to read and parse the csv files. After performing transformations on the data using reduce, the tester data is sent to the client after it is requested when the page loads. The data is stored in the initialState of a redux store. As the user selects countries and devices as there search parameters, the search results are updated by map functions in reducers of the redux store. Flexbox is used for display responsiveness.

### Install dependencies
Run `npm install` in the root directory and again in the `client` directory

### Run application
`node server` in the root directory and `npm start` in the `client` directory
