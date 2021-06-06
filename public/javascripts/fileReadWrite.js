const fileReadWrite = (req, res, next) => {
  const multer = require('multer');
  const fs = require('fs');
  const UPLOAD_PATH = './uploads'
  const upload = multer({ dest: UPLOAD_PATH })
  const importRestaurant = require('./importRestaurant')
  const file = req.file
  fs.readFile(file.path, (err, data) => {
    if (err) return console.log(err)
    fs.writeFile(`${UPLOAD_PATH}/${file.originalname}`, data, (err) => {
      if (err) return console.log(err)
      importRestaurant(`${file.originalname}`)
      console.log('import done')
      fs.readdir(`${UPLOAD_PATH}`, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(`${UPLOAD_PATH}/${file}`, err => {
            if (err) throw err;
          });
        }
      });
      console.log('remove uploaded files')
    })

  })
  next()
}
module.exports = fileReadWrite