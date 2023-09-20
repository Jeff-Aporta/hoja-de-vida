const multer = require("multer");
const imgbbUploader = require("imgbb-uploader");
const fs = require("fs");
const Jimp = require('jimp');

let API_KEY = "f38bfb60ccdac252c6f30c398a8cda35";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "TEMP");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = cb(
      null,
      Math.random().toString().replaceAll("0.", "") +
      file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});

const upload = multer({ storage });

async function upload_imgbb(options) {
  options["apiKey"] = API_KEY;
  let response = await imgbbUploader(options);
  return response;
}

module.exports = (pack_app) => {
  const { app, mongo } = pack_app;
  app.post("/crear-producto", upload.any(), async (req, res, next) => {
    let imagenes = [];
    for (let i = 0; i < req.files.length; i++) {
      let file = req.files[i];
      const image = await Jimp.read(file.path);
      let w = image.bitmap.width;
      let h = image.bitmap.height;
      let ew = 1300 / w;
      let eh = 1300 / h;
      let e = ew < eh ? ew : eh;
      if (e > 1) {
        e = 1;
      }

      let nuevoNombre = file.path.split(".");
      let extension = nuevoNombre.pop();
      nuevoNombre = nuevoNombre.join(".") + "-min." + extension;


      await image.resize(w * e, h * e).write(nuevoNombre);


       let imgbb = await upload_imgbb({
        imagePath: nuevoNombre,
      }); 
      imagenes.push(imgbb);
      setTimeout(() => {
        fs.unlink(file.path, (err) => {
          if (err) {
            throw err;
          }
          console.log("Archivo eliminado");
        });
      }, 1000);
    }
    req.body.imagenes = imagenes;
    mongo.escribir(req.body, "Productos");

    res.redirect("/");
  });
};
