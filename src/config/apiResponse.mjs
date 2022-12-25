  const Success = (message, results, statusCode) => {
    return {
      message,
      error: false,
      code: statusCode,
      results
    };
  };
  

  const Error = (message, statusCode) => {

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

  const Validation = (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  };

  export {Success,Error,Validation};