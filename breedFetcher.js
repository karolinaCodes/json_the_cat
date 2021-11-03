const request = require("request");
const breed = process.argv.slice(2);

request(
  `https://api.thecatapi.com/v1/breeds/search?q=${breed}`,
  (error, response, body) => {
    const data = JSON.parse(body);
    // #### -> failure
    //breed not found
    // console.log(data);
    if (data.length === 0) {
      console.log("Requested breed not found!");
      return;
    }

    //if request failed ex. if typo in url
    if (response.statusCode === 404) {
      const errorMsg = JSON.parse(body).message;
      console.log("An error has occured: " + errorMsg);
      return;
    }

    // #### -> success
    const breedDescription = data[0].description;
    console.log(breedDescription);
  }
);
