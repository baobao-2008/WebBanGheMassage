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

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      formData: {
        hoTen: "",
        taiKhoan: "",
        matKhau: "",
        soDienThoai: "",
        email: "",
        vaiTro: "khachhang",
      },
    };
  },

  methods: {
    async handleRegister() {
      try {
        if (!this.validateForm()) {
          return;
        }

        //Kiểm tra xem tài khoản đã tồn tại chưa
        const checkUser = await axios.get("http://localhost:3000/NguoiDung");
        const existingUser = checkUser.data.find(
          (u) => u.taiKhoan === this.formData.taiKhoan,
        );

        if (existingUser) {
          alert("Tên tài khoản đã tồn tại! Vui lòng chọn tên khác. ");
          this.isSubmitting = false;
          return;
        }

        //Tạo tài khoản user mới
        const newUser = {
          taiKhoan: this.formData.taiKhoan,
          matKhau: this.formData.matKhau,
          hoTen: this.formData.hoTen,
          soDienThoai: this.formData.soDienThoai,
          email: this.formData.email || "",
          vaiTro: this.formData.vaiTro,
        };

        const userReponse = await axios.post(
          "http://localhost:3000/NguoiDung",
          newUser,
        );

        //Nếu là khách hàng thì thêm vào bảng khách hàng
        if (this.formData.vaiTro === "khachhang") {
          await axios.post("http://localhost:3000/KhachHang", {
            hoTen: this.formData.hoTen,
            soDienThoai: this.formData.soDienThoai,
            email: this.formData.email || "",
            diaChi: "",
          });
        }

        console.log("Đăng ký thành công: ", userReponse.data);
        alert("Đăng ký thành công");

        this.$router.push("/login");
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert("Có lỗi khi đăng ký! Vui lòng thử lại.");
      }
    },

    validateForm() {
      // Kiểm tra độ dài tài khoản
      if (this.formData.taiKhoan.length < 4) {
        alert("Tên tài khoản phải có ít nhất 4 ký tự!");
        return false;
      }

      // Kiểm tra độ dài mật khẩu
      if (this.formData.matKhau.length < 3) {
        alert("Mật khẩu phải có ít nhất 3 ký tự!");
        return false;
      }

      //Kiểm tra số điện thoại
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.formData.soDienThoai)) {
        alert("Số điện thoại phải có 10 chữ số!");
        return false;
      }

    },

    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>
