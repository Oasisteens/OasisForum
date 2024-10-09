import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";

let fileCount = 0; // Initialize a variable to keep track of the file count

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads/")); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    let filename;
    if (req.body.title) {
      filename = req.body.title + "-" + Date.now() + "." + fileExtension; // Generate a unique filename
    } else {
      filename = req.body.postId + "-" + Date.now() + "." + fileExtension;
    }
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
}).array("files", 9);

export const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return NextResponse.json({ message: "File upload error", status: 500 });
    } else if (err) {
      // An unknown error occurred during file upload
      return NextResponse.json({
        message: "Unknown error occurred",
        status: 500,
      });
    }

    // Set the file count to the number of uploaded files at the moment
    fileCount = req.files ? req.files.length : 0; // Check if req.files exist before getting the length

    next();
  });
};

export const getFileCount = () => {
  return fileCount; // Return the file count
};
