<template>
  <div class="container mt-4">
    <h2 class="text-danger fw-bold mb-4">Quản lý sản phẩm</h2>

    <section>
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
          @click="openAddModal"
        >
          <i class="bi bi-plus-circle"></i>
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>
    </section>

    <section>
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
    </section>

    <section>
      <div
        class="modal fade"
        id="addProductModal"
        tabindex="-1"
        aria-labelledby="addProductModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <!-- Header Modal -->
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title" id="addProductModalLabel">
                <i class="bi bi-plus-circle me-2"></i>
                Thêm sản phẩm mới
              </h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <!-- Body Modal -->
            <div class="modal-body">
              <form @submit.prevent="addProduct">
                <!-- Tên sản phẩm -->
                <div class="nb-3">
                  <label class="form-label fw-bold">
                    Tên sản phẩm <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="newProduct.tenSP"
                    class="from-control"
                    placeholder="Nhập tên sản phẩm"
                    required
                  />
                </div>

                <!-- Giá sản phẩm -->
                <div class="mb-3">
                  <label class="form-label fw-bold">
                    Giá (VNĐ) <span class="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    v-model="newProduct.gia"
                    class="from-control"
                    placeholder="Nhập giá sản phẩm"
                    required
                    min="0"
                  />
                </div>

                <!-- Preview ảnh -->
                <div v-if="newProduct.hinhAnh" class="mb-3 text-center">
                  <label class="form-label fw-bold">Xem trước: </label>
                  <div>
                    <img
                      :src="newProduct.hinhAnh"
                      alt="Preview"
                      @error="imageError"
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold">
                    Link hình ảnh <span class="text-danger">*</span>
                  </label>
                  <input
                    type="url"
                    v-model="newProduct.hinhAnh"
                    class="form-control"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <!-- Button thêm sản phẩm -->
                <div class="d-flex gap-2 justify-content-end">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    <i class="bi bi-x-circle me-1"></i> Hủy
                  </button>
                  <button type="submit" class="btn btn-success">
                    <i class="bi bi-check-circle me-1"></i>
                    Thêm sản phẩm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import "@/assets/admin.css";
import axios from "axios";

export default {
  name: "AdminPage",
  data() {
    return {
      ListSP: [], //Danh sách sản phẩm
      newProduct: {
        //object chứa sản phẩm mới
        tenSP: "",
        gia: "",
        hinhAnh: "",
      },
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

    //Mở modal thêm sản phẩm
    openAddModal() {
      //Reset from về rỗng
      this.newProduct = {
        tenSP: "",
        gia: "",
        hinhAnh: "",
      };

      // Mở modal
      const modal = new window.bootstrap.modal(
        document.getElementById("addProductModal"),
      );
      modal.show();
    },

    // Thêm sản phẩm mới
    async addProduct() {
      try {
        if (
          !this.newProduct.tenSP ||
          !this.newProduct.gia ||
          !this.newProduct.hinhAnh
        ) {
          alert("Vui lòng điền đầy đủ thông tin!");
          return;
        }

        //Gửi request Post lên MockAPI
        const response = await axios.post(
          "https://696c9009f4a79b31517f4795.mockapi.io/api/v1/SanPham",
          {
            tenSP: this.addProduct.tenSP,
            gia: parseInt(this.newProduct.gia),
            hinhAnh: this.newProduct.hinhAnh,
          },
        );

        console.log("Thêm thành công:", response.data);

        //Đóng Modal
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("addProductModal"),
        );
        modal.hide();

        alert(`Đã thêm sản phẩm "${this.newProduct.tenSP}" thành công!`);

        //Reload danh sách sản phẩm
        this.getProducts();

        //Reset form
        this.newProduct = {
          tenSP: "",
          gia: "",
          hinhAnh: "",
        };
      } catch (error) {
        console.error("Có lỗi khí thêm sản phẩm: ", error);
        alert("Có lỗi xảy ra khi thêm sản phẩm!");
      }
    },
    //Xử lý lỗi ảnh
    imageError(event) {
      event.target.src = "http://via.placeholder.com/200?text=Invalid+Image";
    },

    goToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>
