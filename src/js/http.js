/**
 * @author Muchiri njugi
 * @license MIT
 *
 */

// httpRequest is a constructor function for all httpRequest request related functions
function HttpRequest() {}

// The get function takes a url as a parameter and uses fetch to get data from the url
HttpRequest.prototype.Get = async function(url) {
   const urlResponse = await fetch(url);
   const responseData = await urlResponse.json();
   return responseData;
};

// export the container
const http = new HttpRequest();
export default http;
