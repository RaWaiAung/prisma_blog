import AppError from "./appError";
// handle error of development
const sendErrorDev = (err, res) => {
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// handle error for production
const sendErrorPro = (err: any, res: any) => {
  console.log(res);
  // operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programming error
    console.log("Error occur", err);
    res.status(500).json({
      status: "500",
      message: "Something went very wrong",
    });
  }
};

const handleJWTError = () =>
  new AppError("Invalid token, Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, Please log in again!", 401);
const globalHandler = (err: any, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    // if (error.name === 'CastError') error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === 'ValidationError') error = handleValidatonErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorPro(error, res);
  }
};

export default globalHandler;
