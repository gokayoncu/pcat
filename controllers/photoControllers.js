const Photo = require('../models/Photo.js');
const fs = require('fs');
const path = require('path');

const getAllPhotos = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Mevcut sayfayı al
    const photosPerPage = 2;
    const totalPhotos = await Photo.countDocuments(); // Toplam fotoğraf sayısını al
  
    const photos = await Photo.find({})
      .sort('-dateCreated')
      .skip((page - 1) * photosPerPage)
      .limit(photosPerPage);
  
    res.render('index', {
      photos,
      current: page, // Mevcut sayfayı ayarla
      pages: Math.ceil(totalPhotos / photosPerPage), // Sayfa sayısını hesapla
    });
  };
const getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
};
const editPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit', { photo });
};
const createPhoto = async (req, res) => {
  const uploadDir = path.join(__dirname, '../public/uploads'); // Kök dizine git
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = path.join(uploadDir, uploadedImage.name); // Doğru yolu oluştur
  uploadedImage.mv(uploadPath, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err); // Hata durumunda yanıt ver
    }
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};
const updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photo/${req.params.id}`);
};
const deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = path.join(__dirname, '../public', photo.image); // Doğru yolu oluştur
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

module.exports = {
  // Burada export işlemi düzeltildi
  getAllPhotos,
  getPhoto,
  editPhoto,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
