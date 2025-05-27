import ErrorResponse from "../utils/erorrModel.js";
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      next(new ErrorResponse("forbbiden", 403));
    }

    if (!roles.includes(req.user.role)) {
      next(new ErrorResponse("forbbiden", 403));
    }

    next();
  };
};

export default authorize;
