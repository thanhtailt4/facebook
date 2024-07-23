const cloudinary = require("cloudinary");
const fs = require("fs");
const path = require("path");


cloudinary.config({
  cloud_name: "dii5yhoar",
  api_key: "412528867294949",
  api_secret: "E1xPrCZLTqFqUZs7GM2eNURHpNM",
});
exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);
      images.push(url);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.listImages = async (req, res) => {
  const cover_pictures = [];
  const post_images = [];
  const profile_pictures = [];
  const { path, sort, max } = req.body;
  cloudinary.v2.search
    .expression(`${path}*`)
    .sort_by("created_at", `${sort}`)
    .max_results(max)
    .execute()
    .then((result) => {
      result.resources.forEach((photo) => {
        if (photo.folder === `${path}cover_pictures`) {
          cover_pictures.push(photo); // Thêm hình ảnh vào mảng cover_pictures
        } else if (photo.folder === `${path}post_images`) {
          post_images.push(photo); // Thêm hình ảnh vào mảng post_images
        } else if (photo.folder === `${path}profile_pictures`) {
          profile_pictures.push(photo); // Thêm hình ảnh vào mảng profile_pictures
        }
      });
      res.json({ cover_pictures, post_images, profile_pictures , result});
    })
    .catch((err) => {
      console.log(err.error.message);
    });
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
