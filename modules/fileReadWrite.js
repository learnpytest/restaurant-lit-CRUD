const multer = require('multer');
const UPLOAD_PATH = './uploads'
const upload = multer({ dest: UPLOAD_PATH })
const fs = require('fs');
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const Restaurant = require('../models/restaurant') // 資料庫模板

const fileReadWrite = async (req, res, next) => {
  const file = req.file
  try {
    const dataBuffer = await readFile(file.path)
    await Restaurant.insertMany(JSON.parse(dataBuffer).results)
  } catch (err) {
    // @Todo error handling
    return console.log(err)
  }
  next()
}

module.exports = fileReadWrite




// const fileReadWrite = (req, res, next) => {
//   const file = req.file
//   fs.readFile(file.path, (err, data) => {
//     if (err) return console.log(err)
//     fs.writeFile(`${UPLOAD_PATH}/${file.originalname}`, data, (err) => {
//       if (err) return console.log(err)
//       importRestaurant(`${file.originalname}`)
//       console.log('import done')
//       fs.readdir(`${UPLOAD_PATH}`, (err, files) => {
//         if (err) throw err;
//         for (const file of files) {
//           fs.unlink(`${UPLOAD_PATH}/${file}`, err => {
//             if (err) throw err;
//           });
//         }
//       });
//       console.log('remove uploaded files')
//     })
//   })
//   next()
// }
