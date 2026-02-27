<template>
  <header>
    <section class="bg-light d-none d-lg-block">
      <div class="container-fluid px-4">
        <div class="d-flex justify-content-end gap-4 py-2">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-telephone-fill"></i>
            <span class="small">Tư vấn: 0964250706</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-tools"></i>
            <span class="small">Bảo hành: 0964250706</span>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white shadow-sm">
      <div class="container">
        <div class="row align-items-center p-3">
          <!-- Logo (desktop) -->
          <div class="col-auto d-none d-lg-block img-logo">
            <img
              :src="require('@/assets/images/logos/logo.png')"
              alt="logo"
              @click="router.push('/')"
            />
          </div>

          <!-- Nav (desktop) -->
          <div class="col d-none d-lg-block hover-link">
            <ul class="list-unstyled d-flex justify-content-center gap-4 m-0">
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

          <!-- Icons desktop -->
          <div
            class="col-auto ms-auto d-none d-lg-flex align-items-center gap-3"
          >
            <i class="bi bi-search fs-5"></i>
            <div
              v-if="!user"
              @click="router.push('/login')"
              class="d-flex align-items-center"
              style="cursor: pointer"
            >
              <i class="bi bi-person-circle fs-5"></i
              ><span class="ms-1">Đăng nhập</span>
            </div>
            <i
              v-if="
                user && (user.vaiTro === 'admin' || user.vaiTro === 'nhanvien')
              "
              @click="goToAdminPage"
              class="bi bi-gear fs-5"
              style="cursor: pointer"
            ></i>
            <div
              v-if="user"
              @click="handleLogout"
              style="cursor: pointer"
              class="d-flex align-items-center"
            >
              <span class="me-2 fw-bold text-danger">{{ user.hoTen }}</span>
              <i class="bi bi-person-x-fill text-danger fs-5"></i>
            </div>
            <div
              class="position-relative"
              @click="router.push('/cart')"
              style="cursor: pointer"
            >
              <i class="bi bi-cart fs-5"></i>
              <span
                v-if="cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size: 0.7rem"
                >{{ cartCount }}</span
              >
            </div>
          </div>

          <!-- Mobile: logo + hamburger -->
          <div
            class="col d-flex d-lg-none align-items-center justify-content-between"
          >
            <img
              :src="require('@/assets/images/logos/logo.png')"
              alt="logo"
              @click="router.push('/')"
              style="height: 40px; cursor: pointer"
            />
            <button
              class="btn btn-outline-danger"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mobileMenu"
            >
              <i class="bi bi-list fs-3"></i>
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="collapse d-lg-none" id="mobileMenu">
          <div class="card card-body border-0">
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <a
                  href="#"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                  ><i class="bi bi-box-seam me-2"></i>Sản phẩm</a
                >
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                  ><i class="bi bi-info-circle me-2"></i>Về chúng tôi</a
                >
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                  ><i class="bi bi-headset me-2"></i>Hỗ trợ</a
                >
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                  ><i class="bi bi-gear me-2"></i>Dịch vụ</a
                >
              </li>
              <li class="mb-2">
                <a
                  href="#"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                  ><i class="bi bi-journal-text me-2"></i>Blog</a
                >
              </li>
              <hr />
              <!-- Giỏ hàng nằm trong ul, cùng hàng với các mục khác -->
              <li class="mb-2">
                <a
                  href="#"
                  @click.prevent="router.push('/cart')"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                >
                  <i class="bi bi-cart me-2"></i>Giỏ hàng
                  <span
                    v-if="cartCount > 0"
                    class="badge rounded-pill bg-danger ms-1"
                    >{{ cartCount }}</span
                  >
                </a>
              </li>
              <li v-if="!user" class="mb-2">
                <a
                  href="#"
                  @click.prevent="router.push('/login')"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                >
                  <i class="bi bi-person-circle me-2"></i>Đăng nhập
                </a>
              </li>
              <li
                v-if="
                  user &&
                  (user.vaiTro === 'admin' || user.vaiTro === 'nhanvien')
                "
                class="mb-2"
              >
                <a
                  href="#"
                  @click.prevent="goToAdminPage"
                  class="text-decoration-none link-dark fw-bold d-block py-2 px-3 rounded hover-mobile"
                >
                  <i class="bi bi-gear me-2"></i>Quản lý
                </a>
              </li>
              <li v-if="user" class="mb-2">
                <a
                  href="#"
                  @click.prevent="handleLogout"
                  class="text-decoration-none text-danger fw-bold d-block py-2 px-3 rounded hover-mobile"
                >
                  <i class="bi bi-person-x-fill me-2"></i>Đăng xuất ({{
                    user.hoTen
                  }})
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);
const staffInfo = ref(null);
const cartCount = ref(0);

function loadUser() {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    user.value = JSON.parse(savedUser);
    const savedStaff = localStorage.getItem("staffInfo");
    if (savedStaff) staffInfo.value = JSON.parse(savedStaff);
  }
}

function updateCartCount() {
  const cart = localStorage.getItem("cart");
  cartCount.value = cart
    ? JSON.parse(cart).reduce((sum, item) => sum + item.quantity, 0)
    : 0;
}

function goToAdminPage() {
  if (user.value.vaiTro === "admin") router.push("/admin");
  else if (staffInfo.value) {
    const routes = {
      "Chăm sóc khách hàng": "/custorner",
      "Nhân viên bán hàng": "/bill",
    };
    router.push(routes[staffInfo.value.chucVu] || "/");
  }
}

function handleLogout() {
  if (confirm("Bạn có muốn đăng xuất không?")) {
    localStorage.clear();
    user.value = null;
    staffInfo.value = null;
    cartCount.value = 0;
    router.push("/");
  }
}

onMounted(() => {
  loadUser();
  updateCartCount();
  window.addEventListener("user-login", loadUser);
  window.addEventListener("cart-updated", updateCartCount);
});

onBeforeUnmount(() => {
  window.removeEventListener("user-login", loadUser);
  window.removeEventListener("cart-updated", updateCartCount);
});
</script>

<style>
@import "@/assets/mainweb.css";
</style>
