const renderCategory = (req, res) => {
    let fullname = `${req.user.firstname} ${req.user.lastname}`;
    res.render("pages/categories", {title:"Categories", username :fullname});   
}

module.exports = {
    renderCategory
}