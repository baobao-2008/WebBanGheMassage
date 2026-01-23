const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Cho phép CORS
app.use(cors());
app.use(express.json());

// Tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, "public", "Image_ASS");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình Multer để lưu file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Tạo tên file unique để tránh trùng lặp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    // Loại bỏ ký tự đặc biệt
    const safeName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, "-");
    cb(null, safeName + "-" + uniqueSuffix + ext);
  },
});

// Filter chỉ cho phép upload ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif, webp)!"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
  fileFilter: fileFilter,
});

// API upload ảnh
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Không có file được upload!",
      });
    }

    // Trả về tên file đã lưu
    res.json({
      success: true,
      message: "Upload thành công!",
      filename: req.file.filename,
      path: `/Image_ASS/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi upload file: " + error.message,
    });
  }
});

// API xóa ảnh
app.delete("/delete-image/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({
        success: true,
        message: "Đã xóa ảnh thành công!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Không tìm thấy file!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa file: " + error.message,
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Upload server đang chạy!" });
});

app.listen(PORT, () => {
  console.log(`Upload server đang chạy tại http://localhost:${PORT}`);
  console.log(`Thư mục lưu ảnh: ${uploadDir}`);
});
