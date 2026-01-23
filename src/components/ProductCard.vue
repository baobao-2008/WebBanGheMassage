<template>
  <div class="card h-100 text-center product-card">
    <div class="px-2 pt-3 image-wrapper" @click="viewDetail">
      <img
        :src="getImagePath(product.hinhAnh)"
        class="card-img-top img-fluid product-image"
        style="max-height: 280px; width: 100%; object-fit: contain"
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
          <i class="bi bi-eye"></i>
          <span>Xem chi tiết</span>
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
<script>
import "@/assets/product-card.css";
export default {
  name: "ProductCard",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN").format(value);
    },

    getImagePath(imageName) {
      // Nếu đường dẫn bắt đầu bằng http/https thì dùng trực tiếp
      if (imageName.startsWith('http')) {
        return imageName;
      }
      
      // Nếu đường dẫn bắt đầu bằng / thì là đường dẫn từ public
      if (imageName.startsWith('/')) {
        return imageName;
      }
      
      // Nếu chỉ là tên file, thử tìm trong public/Image_ASS
      try {
        return `/Image_ASS/${imageName}`;
      } catch (error) {
        console.error('Không tìm thấy ảnh:', imageName);
        return ''; // Ảnh placeholder nếu không tìm thấy
      }
    },

    handleImageError(event) {
      console.error('Lỗi load ảnh:', this.product.hinhAnh);
      // Có thể set ảnh placeholder
      event.target.src = 'https://via.placeholder.com/280x280?text=No+Image';
    },

    viewDetail() {
      this.$router.push({
        name: "ProductDetail",
        params: { id: this.product.id },
      });
    },

    addToCart() {
      alert(`Đã thêm "${this.product.tenSP}" vào giỏ hàng!`);
    },
  },
};
</script>