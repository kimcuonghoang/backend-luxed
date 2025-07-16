export const permission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];

    if (userPermissions.includes(requiredPermission)) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden: You do not have permission to access this resource.",
      });
    }
  };
};
