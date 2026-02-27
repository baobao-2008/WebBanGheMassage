<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4 p-4 rounded bg-white shadow">
        <h3 class="text-center text-danger mb-4">Đăng nhập</h3>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Tên tài khoản</label>
            <input
              v-model="taiKhoan"
              type="text"
              class="form-control"
              placeholder="Nhập tên tài khoản"
              required
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input
              type="password"
              v-model="matKhau"
              class="form-control"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" class="btn btn-danger w-100 py-2 mb-3">
            <span>Đăng nhập</span>
          </button>

          <div class="text-center">
            <span>Chưa có tài khoản? </span>
            <a
              href="#"
              @click.prevent="goToRegister"
              class="text-danger fw-bold"
            >
              Đăng ký ngay
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const taiKhoan = ref("");
const matKhau = ref("");

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
    id: "2",
    taiKhoan: "khachhang1",
    matKhau: "123",
    hoTen: "Nguyễn Quốc Bảo",
    soDienThoai: "0912345678",
    email: "khachhang@gmail.com",
    vaiTro: "khachhang"
  },
  {
    id: "3",
    taiKhoan: "baobao123",
    matKhau: "baobao123@",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "",
    vaiTro: "khachhang"
  },
  {
    id: "4",
    taiKhoan: "Binh",
    matKhau: "Binh123",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binh123@gmail.co",
    vaiTro: "khachhang"
  },
  {
    id: "5",
    taiKhoan: "Binhh",
    matKhau: "Binh123",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binhda06811@gmail.com",
    vaiTro: "nhanvien"
  },
  {
    id: "6",
    taiKhoan: "Minh",
    matKhau: "Minh123",
    hoTen: "Phạm Công Minh",
    soDienThoai: "0987548374",
    email: "Minh33@gmail.com",
    vaiTro: "nhanvien"
  },
  {
    id: "7",
    taiKhoan: "rttt",
    matKhau: "123456789",
    hoTen: "grtg",
    soDienThoai: "0846375633",
    email: "rehjhjj@gmail.com",
    vaiTro: "khachhang"
  }
]);

function handleLogin() {
  const user = listNguoiDung.value.find(
    (u) => u.taiKhoan === taiKhoan.value && u.matKhau === matKhau.value
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.dispatchEvent(new Event("user-login"));
    alert(`Chào mừng ${user.hoTen}`);
    
    if (user.vaiTro === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
    
    setTimeout(() => {
      window.location.reload();
    }, 100);
  } else {
    alert("Tài khoản hoặc mật khẩu không đúng!");
  }
}

function goToRegister() {
  router.push("/register");
}
</script>