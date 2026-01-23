<template>
  <div class="container mt-4">
    <h2 class="text-danger fw-bold mb-4">Quản lý nhân viên</h2>

    <section>
      <div class="d-flex gap-3 mb-4">
        <button class="btn btn-danger d-flex align-items-center gap-2" @click="$router.push('/')">
          <i class="bi bi-arrow-left-circle-fill"></i>
          <span>Quay lại trang chủ</span>
        </button>
        <button class="btn btn-success d-flex align-items-center gap-2" @click="openAddModal">
          <i class="bi bi-plus-circle"></i>
          <span>Thêm nhân viên mới</span>
        </button>
        <button class="btn btn-success d-flex align-items-center gap-2" @click="$router.push('/admin')">
          <i class="bi bi-box-seam"></i>
          <span>Quản lý sản phẩm</span>
        </button>
        <button class="btn btn-info text-white d-flex gap-2" @click="$router.push('/custorner')">
          <i class="bi bi-person-fill-gear"></i>
          <span>Quản lý khách hàng</span>
        </button>
        <button class="btn btn-secondary text-white d-flex gap-2" @click="$router.push('/bill')">
          <i class="bi bi-building-gear"></i>
          <span>Quản lý hóa đơn</span>
        </button>
      </div>
    </section>

    <section>
      <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
          <thead class="table-dark">
            <tr class="text-center">
              <th style="width: 80px">STT</th>
              <th>Họ và tên</th>
              <th style="width: 150px">Số điện thoại</th>
              <th>Email</th>
              <th style="width: 180px">Chức vụ</th>
              <th style="width: 200px">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listNV" :key="item.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="align-middle">{{ item.hoTen }}</td>
              <td class="align-middle text-center">{{ item.soDienThoai }}</td>
              <td class="align-middle">{{ item.email || "Chưa có" }}</td>
              <td class="align-middle text-center">{{ item.chucVu }}</td>
              <td class="text-center">
                <button class="btn btn-warning btn-sm me-2" @click="openEditModal(item)">
                  <i class="bi bi-pencil"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteStaff(item)">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal Thêm -->
    <div class="modal fade" id="addStaffModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">Thêm nhân viên mới</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addStaff">
              <div class="mb-3">
                <label class="form-label fw-bold">Họ và tên <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.hoTen" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Tên tài khoản <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.taiKhoan" class="form-control" required minlength="4" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Mật khẩu <span class="text-danger">*</span></label>
                <input type="password" v-model="formData.matKhau" class="form-control" required minlength="3" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Số điện thoại <span class="text-danger">*</span></label>
                <input type="tel" v-model="formData.soDienThoai" class="form-control" required pattern="[0-9]{10}" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input type="email" v-model="formData.email" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Chức vụ <span class="text-danger">*</span></label>
                <select v-model="formData.chucVu" class="form-select" required>
                  <option value="">-- Chọn chức vụ --</option>
                  <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                  <option value="Chăm sóc khách hàng">Chăm sóc khách hàng</option>
                  <option value="Kế toán">Kế toán</option>
                </select>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="submit" class="btn btn-success">Thêm nhân viên</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Sửa -->
    <div class="modal fade" id="editStaffModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning text-white">
            <h5 class="modal-title">Sửa thông tin nhân viên</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateStaff">
              <div class="mb-3">
                <label class="form-label fw-bold">Họ và tên <span class="text-danger">*</span></label>
                <input type="text" v-model="formData.hoTen" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Số điện thoại <span class="text-danger">*</span></label>
                <input type="tel" v-model="formData.soDienThoai" class="form-control" required pattern="[0-9]{10}" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input type="email" v-model="formData.email" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Chức vụ <span class="text-danger">*</span></label>
                <select v-model="formData.chucVu" class="form-select" required>
                  <option value="">-- Chọn chức vụ --</option>
                  <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                  <option value="Chăm sóc khách hàng">Chăm sóc khách hàng</option>
                  <option value="Kế toán">Kế toán</option>
                </select>
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
  name: "AdminStaffPage",
  data() {
    return {
      listNV: [],
      formData: { id: "", hoTen: "", taiKhoan: "", matKhau: "", soDienThoai: "", email: "", chucVu: "" },
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.vaiTro !== "admin") {
      alert("Bạn không có quyền truy cập!");
      this.$router.push("/");
      return;
    }
    this.getStaffs();
  },
  methods: {
    async getStaffs() {
      const res = await axios.get("http://localhost:3000/NhanVien");
      this.listNV = res.data;
    },

    openAddModal() {
      this.formData = { id: "", hoTen: "", taiKhoan: "", matKhau: "", soDienThoai: "", email: "", chucVu: "" };
      new window.bootstrap.Modal(document.getElementById("addStaffModal")).show();
    },

    async addStaff() {
      const checkUser = await axios.get("http://localhost:3000/NguoiDung");
      if (checkUser.data.find(u => u.taiKhoan === this.formData.taiKhoan)) {
        alert("Tên tài khoản đã tồn tại!");
        return;
      }

      await axios.post("http://localhost:3000/NguoiDung", {
        taiKhoan: this.formData.taiKhoan,
        matKhau: this.formData.matKhau,
        hoTen: this.formData.hoTen,
        soDienThoai: this.formData.soDienThoai,
        email: this.formData.email || "",
        vaiTro: "nhanvien",
      });

      await axios.post("http://localhost:3000/NhanVien", {
        hoTen: this.formData.hoTen,
        soDienThoai: this.formData.soDienThoai,
        email: this.formData.email || "",
        chucVu: this.formData.chucVu,
      });

      window.bootstrap.Modal.getInstance(document.getElementById("addStaffModal")).hide();
      alert("Thêm nhân viên thành công!");
      this.getStaffs();
    },

    openEditModal(staff) {
      this.formData = { ...staff };
      new window.bootstrap.Modal(document.getElementById("editStaffModal")).show();
    },

    async updateStaff() {
      await axios.put(`http://localhost:3000/NhanVien/${this.formData.id}`, {
        hoTen: this.formData.hoTen,
        soDienThoai: this.formData.soDienThoai,
        email: this.formData.email || "",
        chucVu: this.formData.chucVu,
      });

      const users = await axios.get("http://localhost:3000/NguoiDung");
      const userToUpdate = users.data.find(u => u.soDienThoai === this.formData.soDienThoai && u.vaiTro === "nhanvien");
      if (userToUpdate) {
        await axios.put(`http://localhost:3000/NguoiDung/${userToUpdate.id}`, {
          ...userToUpdate,
          hoTen: this.formData.hoTen,
          soDienThoai: this.formData.soDienThoai,
          email: this.formData.email || "",
        });
      }

      window.bootstrap.Modal.getInstance(document.getElementById("editStaffModal")).hide();
      alert("Cập nhật thành công!");
      this.getStaffs();
    },

    async deleteStaff(staff) {
      if (confirm(`Xóa nhân viên "${staff.hoTen}"?`)) {
        await axios.delete(`http://localhost:3000/NhanVien/${staff.id}`);
        
        const users = await axios.get("http://localhost:3000/NguoiDung");
        const userToDelete = users.data.find(u => u.soDienThoai === staff.soDienThoai && u.vaiTro === "nhanvien");
        if (userToDelete) {
          await axios.delete(`http://localhost:3000/NguoiDung/${userToDelete.id}`);
        }

        alert("Xóa nhân viên thành công!");
        this.getStaffs();
      }
    },
  },
};
</script>