<template>
  <div class="card h-100 text-center product-card">
    <div class="px-2 pt-3 image-wrapper" @click="viewDetail">
      <img
        :src="getImagePath(product.hinhAnh)"
        class="card-img-top img-fluid product-image"
        @error="handleImageError"
      />
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-danger fw-bold mb-3" style="min-height: 3rem">
        {{ product.tenSP }}
      </h5>
      <p class="text-danger fw-bold fs-4 mb-3">
        {{ formatPrice(product.gia) }} VNĐ
      </p>
      <div class="mt-auto d-flex flex-column gap-2">
        <button
          class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2"
          @click="viewDetail"
        >
          <i class="bi bi-eye"></i><span>Xem chi tiết</span>
        </button>
        <button
          class="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 border-0"
          @click.stop="addToCart"
        >
          Thêm vào giỏ <i class="bi bi-bag-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({ product: { type: Object, required: true } });
const router = useRouter();

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function getImagePath(imageName) {
  if (imageName.startsWith("http") || imageName.startsWith("/"))
    return imageName;
  return `/Image_ASS/${imageName}`;
}

function handleImageError(event) {
  event.target.src = "https://via.placeholder.com/400x400?text=No+Image";
}

function viewDetail() {
  router.push({ name: "ProductDetail", params: { id: props.product.id } });
}

function addToCart() {
  let cart = localStorage.getItem("cart");
  let cartItems = cart ? JSON.parse(cart) : [];
  const existingItem = cartItems.find((item) => item.id === props.product.id);

  if (existingItem) {
    if (existingItem.quantity < props.product.soLuong) {
      existingItem.quantity++;
      alert(
        `Đã tăng số lượng "${props.product.tenSP}" lên ${existingItem.quantity}`,
      );
    } else {
      alert(
        `Đã đạt số lượng tối đa (${props.product.soLuong}) cho sản phẩm này!`,
      );
      return;
    }
  } else {
    cartItems.push({
      id: props.product.id,
      tenSP: props.product.tenSP,
      gia: props.product.gia,
      hinhAnh: props.product.hinhAnh,
      soLuong: props.product.soLuong,
      quantity: 1,
    });
    alert(`Đã thêm "${props.product.tenSP}" vào giỏ hàng!`);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.dispatchEvent(new Event("cart-updated"));
}
</script>

<style scoped>
.product-image {
  max-height: 400px !important;
  min-height: 350px;
  object-fit: contain;
  transition: transform 0.3s;
}
.image-wrapper {
  min-height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f8f9fa, #fff);
  border-radius: 8px;
  cursor: pointer;
}
.image-wrapper:hover .product-image {
  transform: scale(1.05);
}
.product-card {
  transition: transform 0.3s, box-shadow 0.3s;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .product-image {
    max-height: 280px !important;
    min-height: 250px;
  }
  .image-wrapper {
    min-height: 280px;
  }
}
</style>
