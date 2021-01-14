// lambda-like handler function
module.exports.handler = async event => {
  if (
    typeof event === "undefined" ||
    event === {} ||
    typeof event["headers"] === "undefined" ||
    event["headers"]["content-type"] !== "application/json"
  ) {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    if (event["httpMethod"] == "GET") {
      let testingvariable = event["queryStringParameters"];
      return return_value(testingvariable);
    } else {
      let testingvariable = JSON.parse(event["body"]);
      return return_value(testingvariable);
    }
  } catch (e) {
    console.log(e);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};

const return_value = function(checkingparameter) {
  var fs = require("fs");
  let rawdata = fs.readFileSync("src/data.json");
  let zipdata = JSON.parse(rawdata);
  let keytosearch = Object.keys(checkingparameter)[0];
  let valuetosearch = Object.values(checkingparameter)[0];
  var checkifkeyexits = zipdata.some(val => {
    return Object.keys(val).includes(keytosearch);
  });
  if (checkifkeyexits) {
    let result_array = zipdata.filter(it =>
      it[keytosearch].includes(valuetosearch)
    );
    if (typeof result_array !== "undefined" && result_array.length > 0) {
      return { statusCode: 200, body: JSON.stringify(result_array) };
    } else {
      return { statusCode: 200, body: "No results found" };
    }
  } else {
    return { statusCode: 200, body: "No results found" };
  }
};
