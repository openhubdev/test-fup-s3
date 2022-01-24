const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
//const uuid = require('uuid').v4
//const path = require('path')

const app = express()
app.use(express.static('public'))

//const s3 = new aws.S3({ apiVersion: '2006-03-01' });
const s3 = new aws.S3();
const config = require('config');
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
//AWS.config.loadFromPath('./config.json');

aws.config.update({
    accessKeyId: config.get('AWS.accessKeyId'),
    secretAccessKey: config.get('AWS.secretAccessKey'),
    region: config.get('AWS.region')
})

//console.log("waht is the AWS credentials now? "+credentials);

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cthinks-fileupload',
        //signatureVersion: 'v4',
        //acl: 'public-read', //comment this line if you not enable access object 
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            //const ext = path.extname(file.originalname) // get the file extension
            //cb(null, `uploaded/orig/${uuid()}${ext}`);
            cb(null, 'uploaded/orig/' + Date.now().toString() + '__' + (file.originalname))
        }
    })
})
//https://www.npmjs.com/package/multer-s3
/*
app.post('/upload', upload.array('avatar', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})
*/

app.post('/upload', upload.array('avatar'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
})

// Start server
app.listen(8080, () => console.log(`---- Server running on port 8080 ----`))
