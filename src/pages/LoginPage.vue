<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4 p-4 rounder bg-white">
        <h3 class="text-center text-danger mb-4">Đăng nhập</h3>
        <div class="mb-3">
          <label class="form-label">Tên tài khoản</label>
          <input
            v-model="taiKhoan"
            type="text"
            class="form-control"
            placeholder="Nhập admin hoặc khachhang"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input
            type="password"
            v-model="matKhau"
            class="form-control"
            placeholder="Nhập 123"
          />
        </div>
        <button @click="handleLogin" class="btn btn-danger w-100 py-2">
          Đăng nhập
        </button>
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
        // Gọi API lấy danh sách người dùng
        const res = await axios.get(
          "https://696c9009f4a79b31517f4795.mockapi.io/api/v1/NguoiDung",
        );
        const users = res.data;

        //Kiểm tra tài khoản và mật khẩu
        const user = users.find(
          (u) => u.taiKhoan === this.taiKhoan && u.matKhau === this.matKhau,
        );

        if (user) {
          // Lưu thông tin người dùng vào LocalStorage để ghi nhớ phiên đăng nhập
          localStorage.setItem("user", JSON.stringify(user));
          alert(`Chào mừng ${user.hoTen}`);
          this.$router.push("/"); //Chuyển về trang chủ
        } else {
          alert("Tài khoản hoặc mật khẩu không đúng!");
        }
      } catch (error) {
        console.error("Lỗi đăng nhập: ", error);
      }
    },
  },
};
</script>
