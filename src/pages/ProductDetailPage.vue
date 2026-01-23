<template>
  <div class="container mt-5">
    <div v-if="product" class="row">
      <div class="col-md-6">
        <div class="product-image-container">
          <img
            :src="getImagePath(product.hinhAnh)"
            :alt="product.tenSP"
            class="img-fluid rounded shadow"
            style="width: 100%; max-height: 500px; object-fit: contain"
            @error="handleImageError"
          />
        </div>
      </div>
      <div class="col-md-6">
        <div class="product-info">
          <h2 class="text-danger fw-bold mb-3">{{ product.tenSP }}</h2>

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
            <h5 class="fw-bold">Số lượng có sẵn: <span class="text-success">{{ product.soLuong }}</span></h5>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold">Số lượng mua:</h5>
            <div class="input-group" style="max-width: 150px">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="decreaseQuantity"
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
              >
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>

          <div class="mb-4">
            <button class="btn btn-danger btn-lg px-5" @click="addToCart">
              <i class="bi bi-cart-plus me-2"></i> Thêm vào giỏ hàng
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

          <div class="mt-4">
            <button class="btn btn-outline-secondary" @click="goBack">
              <i class="bi bi-arrow-left me-2"></i>
              Quay lại danh sách
            </button>
          </div>
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

<script>
import axios from "axios";
import "@/assets/product-detail.css";

export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: null,
      quantity: 1,
    };
  },
  mounted() {
    this.getProductDetail();
  },
  methods: {
    async getProductDetail() {
      try {
        const productId = this.$route.params.id;
        const response = await axios.get(
          `http://localhost:3000/SanPham/${productId}`,
        );
        this.product = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      }
    },

    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN").format(value);
    },

    getImagePath(imageName) {
      if (imageName.startsWith('http')) {
        return imageName;
      }
      
      if (imageName.startsWith('/')) {
        return imageName;
      }
      
      return `/Image_ASS/${imageName}`;
    },

    handleImageError(event) {
      console.error('Lỗi load ảnh:', this.product.hinhAnh);
      event.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
    },

    increaseQuantity() {
      this.quantity++;
    },
    
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    addToCart() {
      alert(
        `Đã thêm ${this.quantity} sản phẩm "${this.product.tenSP}" vào giỏ hàng`,
      );
    },

     goBack() {
      this.$router.push("/");
    },
  },
};
</script>