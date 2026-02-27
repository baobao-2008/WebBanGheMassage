<template>
  <div class="admin-layout">
    <AdminSidebar currentPage="bill" />
    <div class="admin-content">
      <div class="container-fluid p-4">
        <h2 class="text-danger fw-bold mb-4">
          <i class="bi bi-building-gear me-2"></i>Quản lý hóa đơn
        </h2>
        
        <section class="bg-white rounded shadow-sm p-4">
          <table class="table table-bordered table-hover">
            <thead class="table-dark">
              <tr class="text-center">
                <th>STT</th>
                <th>Mã hóa đơn</th>
                <th>Tên khách hàng</th>
                <th>Tổng tiền</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in bills" :key="item.maHD" class="text-center">
                <td>{{ index + 1 }}</td>
                <td>{{ item.maHD }}</td>
                <td>{{ item.tenKhachHang }}</td>
                <td>{{ formatPrice(item.tongTien) }} đ</td>
                <td>{{ item.tenSanPham }}</td>
                <td>{{ item.soLuong }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="openEditModal(item)">
                    <i class="bi bi-pencil"></i> Sửa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    <div class="modal fade" id="billModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white">
            <h5 class="modal-title">Sửa hóa đơn</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateBill()">
              <div class="mb-3">
                <label class="form-label fw-bold">Mã hóa đơn</label>
                <input 
                  type="text" 
                  v-model="formData.maHD" 
                  class="form-control bg-light" 
                  readonly
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  Tên khách hàng <span class="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  v-model="formData.tenKhachHang" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  Tên sản phẩm <span class="text-danger">*</span>
                </label>
                <input 
                  type="text" 
                  v-model="formData.tenSanPham" 
                  class="form-control" 
                  required 
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  Số lượng <span class="text-danger">*</span>
                </label>
                <input 
                  type="number" 
                  v-model="formData.soLuong" 
                  class="form-control" 
                  min="1"
                  required 
                />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  Tổng tiền (VNĐ) <span class="text-danger">*</span>
                </label>
                <input 
                  type="number" 
                  v-model="formData.tongTien" 
                  class="form-control" 
                  min="0"
                  required 
                />
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Hủy
                </button>
                <button type="submit" class="btn btn-warning">
                  <i class="bi bi-check-circle me-1"></i>Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import AdminSidebar from "@/components/Adminsidebar.vue";

const bills = ref([
  { maHD: "hd01", tenKhachHang: "Văn Nguyễn Quốc Bảo", tongTien: 3866000000, tenSanPham: "Ghế massage hạng thương gia", soLuong: 9 },
  { maHD: "hd02", tenKhachHang: "Văn Nguyễn Quốc Bảo", tongTien: 33000000, tenSanPham: "Ghế massage hạng thương gia", soLuong: 2 },
  { maHD: "hd03", tenKhachHang: "Văn Nguyễn Quốc Bảo", tongTien: 73000000, tenSanPham: "Ghế massage hạng thương gia", soLuong: 3 },
]);

const formData = reactive({
  maHD: "",
  tenKhachHang: "",
  tongTien: 0,
  tenSanPham: "",
  soLuong: 0,
});

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN").format(value || 0);
}

function openEditModal(bill) {
  Object.assign(formData, bill);
  
  new window.bootstrap.Modal(document.getElementById("billModal")).show();
}

function updateBill() {
  if (!confirm("Bạn có muốn cập nhật hóa đơn này không?")) return;

  const index = bills.value.findIndex(b => b.maHD === formData.maHD);

  if (index !== -1) {
    bills.value[index] = {
    ...formData
    };

    window.bootstrap.Modal.getInstance(document.getElementById("billModal")).hide();
    
    alert("Cập nhật hóa đơn thành công!");
  }
}
</script>

<style scoped>
@import "@/assets/admin-layout.css";
</style>