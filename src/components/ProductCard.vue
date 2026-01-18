<template>
  <div class="card h-100 text-center">
    <div class="px-2 pt-3">
      <img
        :src="product.hinhAnh"
        class="card-img-top img-fluid"
        style="max-height: 280px; width: 100%; object-fit: contain"
      />
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-danger fw-bold mb-3" style="min-height: 3rem">
        {{ product.tenSP }}
      </h5>
      <p class="text-danger fw-bold fs-4 mb-3">
        {{ formatPrice(product.gia) }} VNĐ
      </p>
      <div class="mt-auto">
        <button
          class="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 border-0"
        >
          Thêm vào giỏ <i class="bi bi-bag-heart"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product"], //Nhận dữ liệu từ trang web tuyền vào
  methods: {
    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN").format(value);
    },
  },
};
</script>
