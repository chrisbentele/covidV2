const Update = require("./update-model");

createUpdate = (req, res) => {
    console.log(req);
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide an Update",
        });
    }

    const update = new Update(body);

    if (!update) {
        return res.status(400).json({ success: false, error: err });
    }

    update
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: "Update created!",
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: "Update not created!",
            });
        });
};

getUpdates = async (req, res) => {
    await Update.find({}, (err, updates) => {
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            return res.status(200).json({ success: true, data: updates });
        })
};
getLastUpdate = async (req, res) => {
    await Update.find({}).sort({"date":-1}).limit(1).exec(function(err,update){
            if (err) {
                return res.status(400).json({ success: false, error: err });
            }
            return res.status(200).json({ success: true, data: update });
        })
};

module.exports = {createUpdate, getUpdates, getLastUpdate}