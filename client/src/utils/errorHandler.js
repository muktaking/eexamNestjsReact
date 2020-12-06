export default function errorHandler(e) {
  if (e.response) {
    // checking if server is down, no response will occur
    const responseData = e.response.data;
    if (responseData.statusCode === 400) {
      // server validation error
      let message = "";
      try {
        responseData.message.forEach((v) => {
          message += `${v.value} is not valid in [ ${
            v.property
          } ] field due to " ${Object.values(v.constraints).toString()} "`;
        });
      } catch (error) {
        message = responseData.error;
      }

      return message;
    } else if (responseData.statusCode === 500) {
      return "Internal Server Error: file may be corrupted or so on.";
    } else {
      //for other errors
      return responseData.message;
    }
  } else {
    // if server has no any response
    return "Server may be down. Please try sometime later";
  }
}
