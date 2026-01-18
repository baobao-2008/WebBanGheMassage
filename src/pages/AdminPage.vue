<template>
  <div class="container mt-4">
    <h2 class="text-danger fw-bold mb-4">Quản lý sản phẩm</h2>

    <div class="d-flex gap-3 mb-4">
      <button
        class="btn btn-danger d-flex align-items-center gap-2"
        @click="goToHomePage"
      >
        <i class="bi bi-arrow-left-circle-fill"></i>
        <span>Quay lại trang chủ</span>
      </button>

      <button
        class="btn btn-success d-flex align-items-center gap-2"
        @click="showAddForm"
      >
        <i class="bi bi-plus-circle"></i>
        <span>Thêm sản phẩm mới</span>
      </button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-dark">
          <tr class="text-center">
            <th style="width: 80px">STT</th>
            <th style="width: 210px">Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th style="width: 180px">Giá</th>
            <th style="width: 200px">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ListSP" :key="item.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>
              <img
                :src="item.hinhAnh"
                :alt="item.tenSP"
                style="
                  width: 200px;
                  height: 200px;
                  object-fit: cover;
                  border-radius: 8px;
                "
                class="shadow-sm"
              />
            </td>
            <td class="align-middle">{{ item.tenSP }}</td>
            <td class="align-middle">{{ formatPrice(item.gia) }} VNĐ</td>
            <td class="text-center">
              <button class="btn btn-warning btn-sm me-2">
                <i class="bi bi-pencil"></i> Sửa
              </button>
              <button class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i> Xóa
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminPage",
  data() {
    return {
      ListSP: [], //Danh sách sản phẩm
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    // Lấy danh sách sản phẩm từ API

    getProducts() {
      axios
        .get("https://696c9009f4a79b31517f4795.mockapi.io/api/v1/SanPham")
        .then((response) => {
          this.ListSP = response.data;
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu: ", error);
        });
    },

    //Format giá tiền
    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN").format(value);
    },

    //Thêm sản phẩm
    showAddForm() {
      alert("Chức năng thêm sản phẩm");
    },
    goToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>
