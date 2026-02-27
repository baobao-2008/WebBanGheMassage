<template>
  <div class="container mt-5">
    <div v-if="product" class="row">
      <div class="col-md-6">
          <img
            :src="getImagePath(product.hinhAnh)"
            :alt="product.tenSP"
            class="img-fluid rounded shadow"
            style="width: 100%; max-height: 500px; object-fit: contain"
            @error="handleImageError"
          />
      </div>
      <div class="col-md-6">
          <h2 class="text-danger fw-bold mb-3 mt-3">{{ product.tenSP }}</h2>

          <div class="mb-4">
            <h3 class="text-danger fw-bold">
              {{ formatPrice(product.gia) }} VNĐ
            </h3>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold">Mô tả sản phẩm:</h5>
            <p class="text-muted">
              Đây là sản phẩm chất lượng cao, được nhập khẩu chính hãng. Bảo
              hành 12 tháng, đổi trả miễn phí trong 7 ngày.
            </p>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold">
              Số lượng có sẵn: 
              <span :class="product.soLuong > 0 ? 'text-success' : 'text-danger'">
                {{ product.soLuong }}
              </span>
            </h5>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold">Số lượng mua:</h5>
            <div class="input-group" style="max-width: 150px">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="decreaseQuantity"
                :disabled="quantity <= 1"
              >
                <i class="bi bi-dash"></i>
              </button>
              <input
                type="text"
                class="form-control text-center"
                :value="quantity"
                readonly
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="increaseQuantity"
                :disabled="quantity >= product.soLuong"
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
            <small v-if="quantity >= product.soLuong" class="text-warning">
              <i class="bi bi-exclamation-triangle me-1"></i>
              Đã đạt số lượng tối đa
            </small>
          </div>

          <div class="mb-4 d-flex gap-2">
            <button 
              class="btn btn-danger btn-lg px-4" 
              @click="addToCart"
              :disabled="product.soLuong === 0"
            >
              <i class="bi bi-cart-plus me-2"></i>Thêm vào giỏ hàng
            </button>
          </div>

          <div class="border-top pt-4">
            <h5 class="fw-bold">Thông tin thêm:</h5>
            <ul class="list-unstyled">
              <li>
                <i class="bi bi-check-circle text-success me-2"></i>
                Miễn phí vận chuyển toàn quốc
              </li>
              <li>
                <i class="bi bi-check-circle text-success me-2"></i>
                Bảo hành chính hãng 12 tháng
              </li>
              <li>
                <i class="bi bi-check-circle text-success me-2"></i>
                Đổi trả trong 7 ngày
              </li>
              <li>
                <i class="bi bi-check-circle text-success me-2"></i>
                Hỗ trợ trả góp 0%
              </li>
            </ul>
          </div>

          <div class="mt-4 mb-3">
            <button class="btn btn-outline-secondary" @click="goBack">
              <i class="bi bi-arrow-left me-2"></i>
              Quay lại danh sách
            </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h3 class="text-danger">Không tìm thấy sản phẩm!</h3>
      <button class="btn btn-primary mt-3" @click="goBack">
        Quay lại trang chủ
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import "@/assets/product-detail.css";

const router = useRouter();
const route = useRoute();

const product = ref(null);
const quantity = ref(1);

const listSP = ref([
  {
    id: "1",
    tenSP: "Ghế Massage Poongsan Luxury A1",
    gia: 45000000,
    soLuong: 8,
    hinhAnh: "ghe_massage_2-1768922506276-558747998.webp"
  },
  {
    id: "2",
    tenSP: "Ghế Massage Poongsan MCP-200",
    gia: 32000000,
    soLuong: 0,
    hinhAnh: "ghe_massage_3-1768922518206-767606787.webp"
  },
  {
    id: "3",
    tenSP: "Ghế Massage Trị Liệu PS-300",
    gia: 55000000,
    soLuong: 7,
    hinhAnh: "ghe_massage_3-1768922526972-179220724.webp"
  },
  {
    id: "4",
    tenSP: "Ghế Massage Toàn Thân Gen 4",
    gia: 62000000,
    soLuong: 12,
    hinhAnh: "/Image_ASS/ghe-massage_4.png"
  },
  {
    id: "5",
    tenSP: "Ghế Massage Thông Minh AI-500",
    gia: 75000000,
    soLuong: 4,
    hinhAnh: "ghe_massage_5-1768922538047-83127139.jpg"
  },
  {
    id: "6",
    tenSP: "Ghế Massage Thư Giãn Pro-6",
    gia: 28000000,
    soLuong: 12,
    hinhAnh: "/Image_ASS/ghe-massage_6.png"
  },
  {
    id: "7",
    tenSP: "Ghế Massage Cao Cấp Royal-7",
    gia: 95000000,
    soLuong: 8,
    hinhAnh: "ghe_massage_6-1768922549203-448518549.webp"
  },
  {
    id: "8",
    tenSP: "Ghế Massage Văn Phòng M8",
    gia: 18000000,
    soLuong: 20,
    hinhAnh: "/Image_ASS/ghe-massage_8.png"
  },
  {
    id: "9",
    tenSP: "Ghế Massage Đa Năng S9",
    gia: 42000000,
    soLuong: 7,
    hinhAnh: "/Image_ASS/ghe-massage_9.png"
  },
  {
    id: "6c18",
    tenSP: "Ghế Massage được sản xuất tại Việt Nam",
    gia: 16990000,
    soLuong: 24,
    hinhAnh: "ghe_massage_7-1768922558117-987022830.webp"
  },
  {
    id: "4031",
    tenSP: "rhghtrg",
    gia: 343465,
    soLuong: 31,
    hinhAnh: "ghe_massage_5-1769145143397-960983515.jpg"
  }
]);

function getProductDetail() {
  const productId = route.params.id;
  product.value = listSP.value.find(item => item.id === productId) || null;
}

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function getImagePath(imageName) {
  if (imageName.startsWith('http')) return imageName;
  if (imageName.startsWith('/')) return imageName;
  return `/Image_ASS/${imageName}`;
}

function handleImageError(event) {
  console.error('Lỗi load ảnh:', product.value.hinhAnh);
  event.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
}

function increaseQuantity() {
  if (quantity.value < product.value.soLuong) {
    quantity.value++;
  }
}

function decreaseQuantity() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

function addToCart() {
  let cart = localStorage.getItem("cart");
  let cartItems = cart ? JSON.parse(cart) : [];

  const existingItem = cartItems.find(item => item.id === product.value.id);

  if (existingItem) {
    const newQuantity = existingItem.quantity + quantity.value;
    if (newQuantity <= product.value.soLuong) {
      existingItem.quantity = newQuantity;
      alert(`Đã cập nhật số lượng "${product.value.tenSP}" lên ${newQuantity}`);
    } else {
      alert(`Không thể thêm! Chỉ còn ${product.value.soLuong} sản phẩm.`);
      return;
    }
  } else {
    cartItems.push({
      id: product.value.id,
      tenSP: product.value.tenSP,
      gia: product.value.gia,
      hinhAnh: product.value.hinhAnh,
      soLuong: product.value.soLuong,
      quantity: quantity.value,
    });
    alert(`Đã thêm ${quantity.value} "${product.value.tenSP}" vào giỏ hàng!`);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.dispatchEvent(new Event("cart-updated"));
  quantity.value = 1;
}

function goBack() {
  router.push("/");
}

onMounted(() => {
  getProductDetail();
});
</script>