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

          <!-- Link đăng ký -->
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

<script>
import axios from "axios";

export default {
  data() {
    return {
      taiKhoan: "",
      matKhau: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.get("http://localhost:3000/NguoiDung");
        const users = res.data;

        //Kiểm tra tài khoản và mật khẩu
        const user = users.find(
          (u) => u.taiKhoan === this.taiKhoan && u.matKhau === this.matKhau,
        );

        if (user) {
          // Lưu thông tin người dùng vào LocalStorage để ghi nhớ phiên đăng nhập
          localStorage.setItem("user", JSON.stringify(user));
          window.dispatchEvent(new Event("user-login"));
          alert(`Chào mừng ${user.hoTen}`);
          //reload về trang chủ
          if (user.vaiTro === "admin") {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          alert("Tài khoản hoặc mật khẩu không đúng!");
        }
      } catch (error) {
        console.error("Lỗi đăng nhập: ", error);
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
