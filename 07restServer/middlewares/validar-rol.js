const isAdmin = (req = request, res = response, next) => {
    if (!req.user)
        return res.status(500).json({
            msg: "El usuario no ha sido autenticado",
        });
    const { role, name } = req.user;
    if (role !== "ADMIN_ROLE")
        return res.status(401).json({
            msg: `El usuario ${name} no es admin`,
        });
    next();
};

const haveRole = (...roles) => {
    return (req, res, next) => {
        const { role, name } = req.user;
        if (!roles.includes(role))
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles}`,
            });
        next();
    };
};
module.exports = {
    isAdmin,
    haveRole,
};
