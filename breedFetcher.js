const request = require("request");

const fetchBreedDescription = (breed, callback) => {
  request(
    `https://api.thecatapi.com/v1/breeds/search?q=${breed}`,
    (error, response, body) => {
      const data = JSON.parse(body);

      // #### -> failure
      //breed not found
      if (data.length === 0) {
        // console.log("Requested breed not found!");
        callback("Requested breed not found!", null);
        return;
      }

      //if request failed ex. if typo in url
      if (response.statusCode === 404) {
        const errorMsg = JSON.parse(body).message;
        // console.log("An error has occured: " + errorMsg);
        callback(errorMsg, null);
        return;
      }

      // #### -> success
      const breedDescription = data[0].description;
      callback(null, breedDescription);
      // console.log(breedDescription);
    }
  );
};

module.exports = fetchBreedDescription;
