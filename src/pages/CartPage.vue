<template>
  <div class="container mt-4 mb-5">
    <h2 class="text-danger fw-bold mb-4">
      <i class="bi bi-cart-fill me-2"></i>Giỏ hàng của bạn
    </h2>

    <div v-if="cartItems.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x" style="font-size: 100px; color: #ccc"></i>
      <h3 class="mt-3 text-muted">Giỏ hàng trống</h3>
      <p class="text-muted">Hãy thêm sản phẩm vào giỏ hàng nhé!</p>
      <button class="btn btn-danger mt-3" @click="router.push('/')">
        <i class="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
      </button>
    </div>

    <div v-else>
      <div class="row">
        <div class="col-lg-8">
          <div class="card shadow-sm mb-3">
            <div class="card-body">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="cart-item d-flex align-items-center border-bottom py-3"
              >
                <div class="cart-item-image me-3">
                  <img
                    :src="getImagePath(item.hinhAnh)"
                    :alt="item.tenSP"
                    class="img-fluid rounded"
                    style="width: 120px; height: 120px; object-fit: cover"
                  />
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-2">{{ item.tenSP }}</h5>
                  <p class="text-danger fw-bold mb-2">
                    {{ formatPrice(item.gia) }} đ
                  </p>
                  <div class="d-flex align-items-center gap-3">
                    <div class="btn-group">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        @click="decreaseQuantity(item)"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="bi bi-dash"></i>
                      </button>
                      <button class="btn btn-outline-secondary btn-sm" disabled>
                        {{ item.quantity }}
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        @click="increaseQuantity(item)"
                        :disabled="item.quantity >= item.soLuong"
                      >
                        <i class="bi bi-plus"></i>
                      </button>
                    </div>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="removeItem(item)"
                    >
                      <i class="bi bi-trash me-1"></i>Xóa
                    </button>
                  </div>
                  <small
                    v-if="item.quantity >= item.soLuong"
                    class="text-warning"
                  >
                    <i class="bi bi-exclamation-triangle me-1"></i>Đã đạt số
                    lượng tối đa ({{ item.soLuong }})
                  </small>
                </div>
                <div class="text-end">
                  <p class="text-danger fw-bold fs-5 mb-0">
                    {{ formatPrice(item.gia * item.quantity) }} đ
                  </p>
                </div>
              </div>
              <div class="text-end mt-3">
                <button class="btn btn-outline-danger" @click="clearCart">
                  <i class="bi bi-trash me-1"></i>Xóa tất cả
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card shadow-sm sticky-top" style="top: 20px">
            <div class="card-body">
              <h5 class="card-title mb-3">Tổng kết đơn hàng</h5>
              <div class="d-flex justify-content-between mb-2">
                <span>Tạm tính:</span><span>{{ formatPrice(subtotal) }} đ</span>
              </div>
              <hr />
              <div class="d-flex justify-content-between mb-3">
                <strong>Tổng cộng:</strong>
                <strong class="text-danger fs-4"
                  >{{ formatPrice(subtotal) }} đ</strong
                >
              </div>
              <button class="btn btn-danger w-100 mb-2" @click="openModal">
                <i class="bi bi-credit-card me-2"></i>Thanh toán
              </button>
              <button
                class="btn btn-outline-danger w-100"
                @click="router.push('/')"
              >
                <i class="bi bi-arrow-left me-2"></i>Tiếp tục mua sắm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal thông tin khách hàng -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-box">
        <div
          class="modal-header bg-danger text-white rounded-top px-4 py-3 d-flex justify-content-between align-items-center"
        >
          <h5 class="mb-0">
            <i class="bi bi-person-lines-fill me-2"></i>Thông tin đặt hàng
          </h5>
          <button
            class="btn-close btn-close-white"
            @click="showModal = false"
          ></button>
        </div>
        <div class="modal-body px-4 py-3">
          <div class="mb-3">
            <label class="form-label fw-semibold"
              >Họ và tên <span class="text-danger">*</span></label
            >
            <input
              v-model="info.hoTen"
              type="text"
              class="form-control"
              placeholder="Nhập họ và tên..."
            />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold"
              >Số điện thoại <span class="text-danger">*</span></label
            >
            <input
              v-model="info.soDienThoai"
              type="tel"
              class="form-control"
              placeholder="Nhập số điện thoại..."
            />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold"
              >Địa chỉ giao hàng <span class="text-danger">*</span></label
            >
            <textarea
              v-model="info.diaChi"
              class="form-control"
              rows="2"
              placeholder="Số nhà, đường, phường, quận, tỉnh/thành..."
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Ghi chú</label>
            <textarea
              v-model="info.ghiChu"
              class="form-control"
              rows="2"
              placeholder="Ghi chú thêm (không bắt buộc)..."
            ></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Phương thức thanh toán</label>
            <div class="d-flex gap-4">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="cod"
                  value="COD"
                  v-model="info.phuongThuc"
                />
                <label class="form-check-label" for="cod"
                  >💵 Tiền mặt (COD)</label
                >
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  id="bank"
                  value="Banking"
                  v-model="info.phuongThuc"
                />
                <label class="form-check-label" for="bank"
                  >🏦 Chuyển khoản</label
                >
              </div>
            </div>
          </div>
          <div
            class="p-3 rounded"
            style="background: #fff5f5; border: 1px solid #f8d7da"
          >
            <div class="d-flex justify-content-between small mb-1">
              <span>Tạm tính:</span><span>{{ formatPrice(subtotal) }} đ</span>
            </div>
            <hr class="my-2" />
            <div class="d-flex justify-content-between fw-bold">
              <span>Tổng cộng:</span
              ><span class="text-danger">{{ formatPrice(subtotal) }} đ</span>
            </div>
          </div>
        </div>
        <div class="modal-footer px-4 py-3">
          <button class="btn btn-outline-secondary" @click="showModal = false">
            <i class="bi bi-arrow-left me-1"></i>Quay lại
          </button>
          <button class="btn btn-danger" @click="confirmCheckout">
            <i class="bi bi-check-circle me-1"></i>Xác nhận đặt hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cartItems = ref([]);
const showModal = ref(false);
const info = ref({
  hoTen: "",
  soDienThoai: "",
  diaChi: "",
  ghiChu: "",
  phuongThuc: "COD",
});

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.gia * item.quantity, 0),
);

function loadCart() {
  cartItems.value = JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems.value));
  window.dispatchEvent(new Event("cart-updated"));
}

function increaseQuantity(item) {
  if (item.quantity < item.soLuong) {
    item.quantity++;
    saveCart();
  }
}
function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
    saveCart();
  }
}

function removeItem(item) {
  if (confirm(`Xóa "${item.tenSP}" khỏi giỏ hàng?`)) {
    cartItems.value = cartItems.value.filter((i) => i.id !== item.id);
    saveCart();
  }
}

function clearCart() {
  if (confirm("Xóa tất cả sản phẩm?")) {
    cartItems.value = [];
    saveCart();
  }
}

function openModal() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    alert("Vui lòng đăng nhập để thanh toán!");
    router.push("/login");
    return;
  }
  info.value = {
    hoTen: "",
    soDienThoai: "",
    diaChi: "",
    ghiChu: "",
    phuongThuc: "COD",
  };
  showModal.value = true;
}

function confirmCheckout() {
  if (!info.value.hoTen || !info.value.soDienThoai || !info.value.diaChi) {
    alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
    return;
  }
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({
    ...info.value,
    sanPham: cartItems.value,
    tongTien: subtotal.value,
    ngayDat: new Date().toISOString(),
    trangThai: "Đang xử lý",
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  cartItems.value = [];
  saveCart();
  showModal.value = false;
  alert(`Đặt hàng thành công! Cảm ơn ${info.value.hoTen} đã mua hàng.`);
  router.push("/");
}

function formatPrice(v) {
  return new Intl.NumberFormat("vi-VN").format(v);
}
function getImagePath(img) {
  return img.startsWith("http") || img.startsWith("/")
    ? img
    : `/Image_ASS/${img}`;
}

onMounted(loadCart);
</script>

<style scoped>
.cart-item-image img {
  border: 1px solid #dee2e6;
}
@media (max-width: 991px) {
  .sticky-top {
    position: relative;
    top: 0 !important;
  }
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.modal-box {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
</style>
