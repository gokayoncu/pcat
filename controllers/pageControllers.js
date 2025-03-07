const Photo = require('../models/Photo.js');


const getAboutPage = (req, res) => {
  res.render('about');
};
const editPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('edit', { photo });
};
const getAddPage =(req, res) => {
    res.render('add');
}
module.exports = {  // Burada export işlemi düzeltildi
    editPhoto,
    getAboutPage,
    getAddPage
};
