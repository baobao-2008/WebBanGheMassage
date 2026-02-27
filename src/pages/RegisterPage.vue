<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5 p-4 rounded bg-white shadow">
        <h3 class="text-center text-danger mb-4">Đăng ký tài khoản</h3>

        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label class="form-label"
              >Họ và tên <span class="text-danger">*</span></label
            >
            <input
              type="text"
              v-model="formData.hoTen"
              class="form-control"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label"
              >Tên tài khoản <span class="text-danger">*</span></label
            >
            <input
              type="text"
              v-model="formData.taiKhoan"
              class="form-control"
              placeholder="Nhập tên tài khoản"
              required
              minlength="4"
            />
          </div>

          <div class="mb-3">
            <label class="form-label"
              >Mật khẩu <span class="text-danger">*</span></label
            >
            <input
              type="password"
              v-model="formData.matKhau"
              class="form-control"
              placeholder="Nhập mật khẩu"
              required
              minlength="3"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input
              type="email"
              v-model="formData.email"
              class="form-control"
              placeholder="Nhập email"
            />
          </div>

          <div class="mb-3">
            <label class="form-label"
              >Số điện thoại <span class="text-danger">*</span></label
            >
            <input
              type="tel"
              v-model="formData.soDienThoai"
              class="form-control"
              placeholder="Nhập số điện thoại"
              required
              pattern="[0-9]{10}"
            />
          </div>

          <button type="submit" class="btn btn-danger w-100 py-2 mb-3">
            <span>Đăng ký</span>
          </button>

          <div class="text-center">
            <span>Đã có tài khoản?</span>
            <a href="#" @click.prevent="goToLogin" class="text-danger fw-bold"
              >Đăng nhập ngay</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = reactive({
  hoTen: "",
  taiKhoan: "",
  matKhau: "",
  soDienThoai: "",
  email: "",
  vaiTro: "khachhang",
});

const listNguoiDung = ref([
  {
    id: "1",
    taiKhoan: "admin",
    matKhau: "123",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "admin@company.com",
    vaiTro: "admin"
  },
  {
    id: "3",
    taiKhoan: "khachhang1",
    matKhau: "123",
    hoTen: "Nguyễn Quốc Bảo",
    soDienThoai: "0912345678",
    email: "khachhang@gmail.com",
    vaiTro: "khachhang"
  },
  {
    id: "7432",
    taiKhoan: "baobao123",
    matKhau: "baobao123@",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "",
    vaiTro: "khachhang"
  },
  {
    id: "3387",
    taiKhoan: "Binh",
    matKhau: "Binh123",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binh123@gmail.co",
    vaiTro: "khachhang"
  },
  {
    id: "a4ec",
    taiKhoan: "Binhh",
    matKhau: "Binh123",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binhda06811@gmail.com",
    vaiTro: "nhanvien"
  },
  {
    id: "f9dd",
    taiKhoan: "Minh",
    matKhau: "Minh123",
    hoTen: "Phạm Công Minh",
    soDienThoai: "0987548374",
    email: "Minh33@gmail.com",
    vaiTro: "nhanvien"
  },
  {
    id: "19c0",
    taiKhoan: "rttt",
    matKhau: "123456789",
    hoTen: "grtg",
    soDienThoai: "0846375633",
    email: "rehjhjj@gmail.com",
    vaiTro: "khachhang"
  }
]);

const listKhachHang = ref([
  {
    id: "1",
    hoTen: "Trần Thị B",
    soDienThoai: "0912345678",
    email: "tranthib@gmail.com",
    diaChi: "123 Nguyễn Văn Linh, Quận 7, TP.HCM"
  },
  {
    id: "2",
    hoTen: "Lê Văn C",
    soDienThoai: "0909876543",
    email: "levanc@gmail.com",
    diaChi: "456 Lê Lợi, Quận 1, TP.HCM"
  },
  {
    id: "9cc2",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "",
    diaChi: ""
  },
  {
    id: "e634",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binh123@gmail.co",
    diaChi: ""
  },
  {
    id: "2965",
    hoTen: "grtg",
    soDienThoai: "0846375633",
    email: "rehjhjj@gmail.com",
    diaChi: ""
  }
]);

function validateForm() {
  if (formData.taiKhoan.length < 4) {
    alert("Tên tài khoản phải có ít nhất 4 ký tự!");
    return false;
  }

  if (formData.matKhau.length < 3) {
    alert("Mật khẩu phải có ít nhất 3 ký tự!");
    return false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(formData.soDienThoai)) {
    alert("Số điện thoại phải có 10 chữ số!");
    return false;
  }
  
  return true;
}

function handleRegister() {
  if (!validateForm()) {
    return;
  }

  const existingUser = listNguoiDung.value.find(
    (u) => u.taiKhoan === formData.taiKhoan
  );

  if (existingUser) {
    alert("Tên tài khoản đã tồn tại! Vui lòng chọn tên khác.");
    return;
  }

  // Tạo ID mới dạng hex 4 ký tự
  const newUserId = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');
  const newKhachHangId = Math.floor(Math.random() * 0x10000).toString(16).padStart(4, '0');

  const newUser = {
    id: newUserId,
    taiKhoan: formData.taiKhoan,
    matKhau: formData.matKhau,
    hoTen: formData.hoTen,
    soDienThoai: formData.soDienThoai,
    email: formData.email || "",
    vaiTro: formData.vaiTro,
  };

  listNguoiDung.value.push(newUser);

  if (formData.vaiTro === "khachhang") {
    const newKhachHang = {
      id: newKhachHangId,
      hoTen: formData.hoTen,
      soDienThoai: formData.soDienThoai,
      email: formData.email || "",
      diaChi: "",
    };
    
    listKhachHang.value.push(newKhachHang);
  }

  console.log("Đăng ký thành công: ", newUser);
  alert("Đăng ký thành công!");
  router.push("/login");
}

function goToLogin() {
  router.push("/login");
}
</script>