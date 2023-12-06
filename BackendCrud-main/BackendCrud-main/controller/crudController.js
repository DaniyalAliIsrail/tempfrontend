const CrudModel = require("../model/crudSchema");
const { fileUploader } = require("../utils/fileUploader.js");
const upload = require("../utils/multer.js");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const PostController = async (req, res) => {
  try {
    bodyData = req.body;

    const image = req.files[0].path;
    console.log(image);
    console.log(bodyData);
    // return






    const { title, description, category } = bodyData;
    if (!title || !description || !category) {
      res.json({
        status: false,
        message: "Required Fields Are Missing!",
        data: null,
      });
      return
    }
    //validation nhy lagana hay
    const imageurl = await fileUploader(image)
    // return console.log(imageurl)
    const objtosend = {
      title, 
      description,
       category,
       imageUrl : imageurl.secure_url
    }
    const crudOperation = new CrudModel(objtosend);
    const crudData = await crudOperation.save();
    res.status(200).json({ status: 200, crudData });
  } catch (error) {
    res.send(error)
  }
};
//AllPost
const AllPostController = async (req, res) => {
  try {
    const allData = await CrudModel.find({});
    res.status(200).json({ status: 200, allData });
  }
  catch (error) {
    res.status(400).json({ status: 200, error });

  }
}
//update user
let UpdateController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateuser = await CrudModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    res.status(200).json({ status: 200, updateuser })
  } catch (error) {
    res.send(error)
  }
}
//delet user 
const DeleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const delUser = await CrudModel.findByIdAndDelete({ _id: id })
    res.status(200).json({ status: 200, delUser });
  } catch (error) {
    res.send(error)
  }
}
//? old ways
// router.post("/api/uploadimage", upload.any("image"), (req, res) => {
//   console.log("files", req.files);
//   const path = req.files[0].path;
//   cloudinary.uploader.upload(path, (error, data) => {
//     if (error) {
//       return res.json({
//         message: "Could not upload image to cloud , try again",
//       });
//     }
//     res.json({
//       message: "image upload",
//       data,
//     });
//     fs.unlinkSync(path);
//   });
// });

const ImageUploader = (req, res) => {
  upload.any("image")(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Error uploading files",
        error: err.message,
      });
    }
    console.log("files", req.files);
    const path = req.files[0].path;

    cloudinary.uploader.upload(path, (error, data) => {
      if (error) {
        return res.status(500).json({
          message: "Could not upload image to cloud, try again",
          error: error.message,
          data: null,
        });
      }
      res.json({
        message: "Image upload",
        data,
      });
      // Remove the local file after uploading to Cloudinary
      fs.unlinkSync(path);
    });
  });
};

module.exports = {
  PostController,
  AllPostController,
  UpdateController,
  DeleteController,
  ImageUploader
};
