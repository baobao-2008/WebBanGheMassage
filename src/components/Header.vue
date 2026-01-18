<template>
  <header>
    <section>
      <div
        class="bg-light d-flex justify-content-end gap-5 px-5 pt-2"
        style="height: 45px"
      >
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
            <img
              src="https://media.poongsankorea.vn/media/logo/logo.png"
              alt="logo"
              style="max-height: 50px"
            />
          </div>

          <div class="col">
            <ul
              class="list-unstyled d-flex justify-content-center align-items-center gap-4 m-0"
            >
              <li>
                <a href="#" class="text-decoration-none link-dark fw-bold"
                  >Sản phẩm</a
                >
              </li>
              <li>
                <a href="#" class="text-decoration-none link-dark fw-bold"
                  >Về chúng tôi</a
                >
              </li>
              <li>
                <a href="#" class="text-decoration-none link-dark fw-bold"
                  >Hỗ trợ</a
                >
              </li>
              <li>
                <a href="#" class="text-decoration-none link-dark fw-bold"
                  >Dịch vụ</a
                >
              </li>
              <li>
                <a href="#" class="text-decoration-none link-dark fw-bold"
                  >Blog</a
                >
              </li>
            </ul>
          </div>

          <div class="col-auto">
            <div class="d-flex justify-content-end align-items-center gap-4">
              <div><i class="bi bi-search fs-5"></i></div>

              <div
                v-if="!user"
                @click="goToLogin"
                style="cursor: pointer"
                title="Đăng nhập"
              >
                <i class="bi bi-person-circle"></i>
                <span class="ms-1">Đăng nhập</span>
              </div>
              <div v-if="user" class="d-flex align-items-center gap-3">
                <div
                  v-if="isAdmin"
                  @click.stop="goToCRUD"
                  title="Quản lý sản phẩm"
                  style="cursor: pointer"
                >
                  <i class="bi bi-gear fs-5"></i>
                </div>

                <div
                  @click="handleLogout"
                  title="Nhấn để đăng xuất"
                  style="cursor: pointer"
                >
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
export default {
  name: "Header",
  data() {
    return {
      user: null,
    };
  },
  computed: {
    isAdmin() {
      return (
        this.user && (this.user.vaiTro === 1 || this.user.vaiTro === "admin")
      );
    },
  },
  mounted() {
    this.loadUser();
    // Thêm sự kiện lắng nghe khi localStorage thay đổi
    window.addEventListener("storage", this.loadUser);
    //Thêm custom event để component tự reload
    window.addEventListener("user-login", this.loadUser);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.loadUser);
    window.removeEventListener("user-login", this.loadUser);
  },
  methods: {
    loadUser() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
      } else {
        this.user = null;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToCRUD() {
      alert("Chuyển đến trang quản lý CRUD");
      this.$router.push("/admin");
    },
    handleLogout() {
      if (confirm("Bạn có muốn đăng xuất không?")) {
        localStorage.removeItem("user");
        this.user = null;
        this.$router.push("/"); // Quay về trang chủ
        alert("Đã đăng xuất thành công");
      }
    },
  },
};
</script>
