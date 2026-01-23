<template>
  <div class="container mt-4">
    <h2 class="text-danger fw-bold mb-4">Quản lý sản phẩm</h2>

    <section>
      <div class="d-flex gap-3 mb-4">
        <button class="btn btn-danger d-flex align-items-center gap-2" @click="$router.push('/')">
          <i class="bi bi-arrow-left-circle-fill"></i>
          <span>Quay lại trang chủ</span>
        </button>
        <button class="btn btn-success d-flex align-items-center gap-2" @click="openAddModal">
          <i class="bi bi-plus-circle"></i>
          <span>Thêm sản phẩm mới</span>
        </button>
        <button class="btn btn-info text-white d-flex gap-2" @click="$router.push('/custorner')">
          <i class="bi bi-person-fill-gear"></i>
          <span>Quản lý khách hàng</span>
        </button>
        <button class="btn btn-secondary text-white d-flex gap-2" @click="$router.push('/bill')">
          <i class="bi bi-building-gear"></i>
          <span>Quản lý hóa đơn</span>
        </button>
        <button class="btn btn-dark text-white d-flex gap-2" @click="$router.push('/staff')">
          <i class="bi bi-person-workspace"></i>
          <span>Quản lý nhân viên</span>
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
              <th style="width: 120px">Số lượng</th>
              <th style="width: 200px">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listSP" :key="item.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <img :src="getImagePath(item.hinhAnh)" :alt="item.tenSP" style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px" class="shadow-sm" @error="e => e.target.src = 'https://via.placeholder.com/200'" />
              </td>
              <td class="align-middle">{{ item.tenSP }}</td>
              <td class="align-middle">{{ formatPrice(item.gia) }} VNĐ</td>
              <td class="align-middle text-center">{{ item.soLuong }}</td>
              <td class="text-center">
                <button class="btn btn-warning btn-sm me-2" @click="openEditModal(item)">
                  <i class="bi bi-pencil"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteProduct(item)">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal Thêm -->
    <div class="modal fade" id="addProductModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Thêm sản phẩm mới</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addProduct">
              <div class="mb-3">
                <label class="form-label fw-bold">Tên sản phẩm <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.tenSP" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Giá (VNĐ) <span class="text-danger">*</span></label>
                <input type="number" v-model="formData.gia" class="form-control" required min="0" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Số lượng <span class="text-danger">*</span></label>
                <input type="number" v-model="formData.soLuong" class="form-control" required min="0" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Chọn hình ảnh <span class="text-danger">*</span></label>
                <input type="file" @change="handleImageUpload" class="form-control" accept="image/*" required />
              </div>
              <div v-if="imagePreview" class="mb-3 text-center">
                <img :src="imagePreview" alt="Preview" style="max-width: 100%; max-height: 300px; border-radius: 8px" />
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="submit" class="btn btn-success">Thêm sản phẩm</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Sửa -->
    <div class="modal fade" id="editProductModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white">
            <h5 class="modal-title">Sửa sản phẩm</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateProduct">
              <div class="mb-3">
                <label class="form-label fw-bold">Tên sản phẩm <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.tenSP" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Giá (VNĐ) <span class="text-danger">*</span></label>
                <input type="number" v-model="formData.gia" class="form-control" required min="0" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Số lượng <span class="text-danger">*</span></label>
                <input type="number" v-model="formData.soLuong" class="form-control" required min="0" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Chọn hình ảnh mới (tùy chọn)</label>
                <input type="file" @change="handleImageUpload" class="form-control" accept="image/*" />
              </div>
              <div v-if="imagePreview" class="mb-3 text-center">
                <img :src="imagePreview" alt="Preview" style="max-width: 100%; max-height: 300px; border-radius: 8px" />
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="submit" class="btn btn-warning">Cập nhật</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminPage",
  data() {
    return {
      listSP: [],
      formData: { id: "", tenSP: "", gia: "", soLuong: "", hinhAnh: "" },
      imagePreview: "",
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.vaiTro !== "admin") {
      alert("Bạn không có quyền truy cập!");
      this.$router.push("/");
      return;
    }
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const res = await axios.get("http://localhost:3000/SanPham");
      this.listSP = res.data;
    },

    formatPrice(value) {
      return new Intl.NumberFormat("vi-VN").format(value);
    },

    getImagePath(imageName) {
      if (imageName.startsWith("http")) return imageName;
      if (imageName.startsWith("/")) return imageName;
      return `/Image_ASS/${imageName}`;
    },

    async handleImageUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => { this.imagePreview = e.target.result; };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("http://localhost:3001/upload", formData);
      if (res.data.success) this.formData.hinhAnh = res.data.filename;
    },

    openAddModal() {
      this.formData = { id: "", tenSP: "", gia: "", soLuong: "", hinhAnh: "" };
      this.imagePreview = "";
      new window.bootstrap.Modal(document.getElementById("addProductModal")).show();
    },

    async addProduct() {
      await axios.post("http://localhost:3000/SanPham", {
        tenSP: this.formData.tenSP,
        gia: parseInt(this.formData.gia),
        soLuong: parseInt(this.formData.soLuong),
        hinhAnh: this.formData.hinhAnh,
      });
      window.bootstrap.Modal.getInstance(document.getElementById("addProductModal")).hide();
      alert("Thêm sản phẩm thành công!");
      this.getProducts();
    },

    openEditModal(product) {
      this.formData = { ...product };
      this.imagePreview = this.getImagePath(product.hinhAnh);
      new window.bootstrap.Modal(document.getElementById("editProductModal")).show();
    },

    async updateProduct() {
      await axios.put(`http://localhost:3000/SanPham/${this.formData.id}`, {
        tenSP: this.formData.tenSP,
        gia: parseInt(this.formData.gia),
        soLuong: parseInt(this.formData.soLuong),
        hinhAnh: this.formData.hinhAnh,
      });
      window.bootstrap.Modal.getInstance(document.getElementById("editProductModal")).hide();
      alert("Cập nhật thành công!");
      this.getProducts();
    },

    async deleteProduct(product) {
      if (confirm(`Xóa sản phẩm "${product.tenSP}"?`)) {
        await axios.delete(`http://localhost:3000/SanPham/${product.id}`);
        alert("Xóa thành công!");
        this.getProducts();
      }
    },
  },
};
</script>