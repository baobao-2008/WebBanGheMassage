<template>
  <header>
    <section>
      <div class="bg-light d-flex justify-content-end gap-5 px-5 pt-2" style="height: 45px">
        <div class="d-flex gap-1">
          <i class="bi bi-telephone-fill"></i>
          <p>Tư vấn mua hàng: 0964250706</p>
        </div>
        <div class="d-flex gap-1">
          <i class="bi bi-tools"></i>
          <p>Bảo hành & CSKH: 0964250706</p>
        </div>
      </div>
    </section>

    <section class="sticky-top bg-white shadow-sm">
      <div class="container">
        <div class="row align-items-center p-3">
          <div class="col-auto img-logo">
            <img :src="require('@/assets/images/logos/logo.png')" alt="logo" style="max-height: 50px" />
          </div>

          <div class="col">
            <ul class="list-unstyled d-flex justify-content-center align-items-center gap-4 m-0">
              <li><a href="#" class="text-decoration-none link-dark fw-bold">Sản phẩm</a></li>
              <li><a href="#" class="text-decoration-none link-dark fw-bold">Về chúng tôi</a></li>
              <li><a href="#" class="text-decoration-none link-dark fw-bold">Hỗ trợ</a></li>
              <li><a href="#" class="text-decoration-none link-dark fw-bold">Dịch vụ</a></li>
              <li><a href="#" class="text-decoration-none link-dark fw-bold">Blog</a></li>
            </ul>
          </div>

          <div class="col-auto">
            <div class="d-flex justify-content-end align-items-center gap-4">
              <div><i class="bi bi-search fs-5"></i></div>

              <div v-if="!user" @click="$router.push('/login')" style="cursor: pointer" title="Đăng nhập">
                <i class="bi bi-person-circle"></i>
                <span class="ms-1">Đăng nhập</span>
              </div>

              <div v-if="user" class="d-flex align-items-center gap-3">
                <div v-if="user.vaiTro === 'admin' || user.vaiTro === 'nhanvien'" @click="goToAdminPage" title="Quản lý" style="cursor: pointer">
                  <i class="bi bi-gear fs-5"></i>
                </div>

                <div @click="handleLogout" title="Đăng xuất" style="cursor: pointer">
                  <span class="me-2 fw-bold text-danger">{{ user.hoTen }}</span>
                  <i class="bi bi-person-x-fill text-danger fs-5"></i>
                </div>
              </div>

              <div><i class="bi bi-cart fs-5"></i></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: "Header",
  data() {
    return {
      user: null,
      staffInfo: null,
    };
  },
  mounted() {
    this.loadUser();
    window.addEventListener("user-login", this.loadUser);
  },
  beforeUnmount() {
    window.removeEventListener("user-login", this.loadUser);
  },
  methods: {
    async loadUser() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
        if (this.user.vaiTro === "nhanvien") {
          const res = await axios.get("http://localhost:3000/NhanVien");
          this.staffInfo = res.data.find(s => s.soDienThoai === this.user.soDienThoai);
          if (this.staffInfo) localStorage.setItem("staffInfo", JSON.stringify(this.staffInfo));
        }
      } else {
        this.user = null;
        this.staffInfo = null;
      }
    },

    goToAdminPage() {
      if (this.user.vaiTro === "admin") {
        this.$router.push("/admin");
      } else if (this.staffInfo) {
        const routes = {
          "Chăm sóc khách hàng": "/custorner",
          "Nhân viên bán hàng": "/bill"
        };
        this.$router.push(routes[this.staffInfo.chucVu] || "/");
      }
    },

    handleLogout() {
      if (confirm("Bạn có muốn đăng xuất không?")) {
        localStorage.clear();
        this.user = null;
        this.staffInfo = null;
        this.$router.push("/");
      }
    },
  },
};
</script>