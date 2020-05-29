const router = require('express').Router();

router.get('/test', (req, res) => {
    res.json({
        status: "success"
    });
});

export default router;