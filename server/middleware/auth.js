export const protect = (req, res, next) => {
    try {
        const { userId } = req.auth();

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // attach userId to request
        req.userId = userId;

        next();

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};