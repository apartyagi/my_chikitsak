  const success = (message, results, statusCode) => {
    return {
      message,
      error: false,
      code: statusCode,
      results
    };
  };
  

  const error = (message, statusCode) => {

    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
      message,
      code: statusCode,
      error: true
    };
  };

  const validation = (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  };

  export {success,error,validation};