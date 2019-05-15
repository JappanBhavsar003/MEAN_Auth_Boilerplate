
// Tried using Callback
module.exports = function CustomError(message,status){
    const customError = new Error();
    customError.message = message || 'Something went wrong! Please try again.';
    customError.staus = status || 500;
    return customError;
}

// If you wanted to create your own custom erro classs
// class CustomError extends Error {
//     constructor(message, status){
//         super();
//         Error.captureStackTrace(this, this.constructor);
//         this.name = this.constructor.name;
//         this.message = this.message || 'Something went wrong! Please try again.';
//         this.status = status || 500;
//     }
// }

// module.exports = CustomError;