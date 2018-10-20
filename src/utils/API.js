import axios from "axios";

// Export an object containing methods we'll use for accessing the Dog.Ceo API

export default {
  getRandomCard: function() {
    return axios.get("https://dog.ceo/api/breeds/image/random");
  }
};
