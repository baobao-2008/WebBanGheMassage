<template>
  <div class="admin-layout">
    <AdminSidebar currentPage="staff" />

    <div class="admin-content">
      <div class="container-fluid p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="text-danger fw-bold mb-0">
            <i class="bi bi-person-workspace me-2"></i>Quản lý nhân viên
          </h2>
          <button class="btn btn-success" @click="openAddModal">
            <i class="bi bi-plus-circle me-2"></i>Thêm nhân viên
          </button>
        </div>

        <section class="bg-white rounded shadow-sm p-4">
          <table class="table table-bordered table-hover align-middle">
            <thead class="table-dark">
              <tr class="text-center">
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Chức vụ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listNV" :key="item.id" class="text-center">
                <td>{{ index + 1 }}</td>
                <td>{{ item.hoTen }}</td>
                <td>{{ item.soDienThoai }}</td>
                <td>{{ item.email || "Chưa có" }}</td>
                <td>{{ item.chucVu }}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-2" @click="openEditModal(item)">
                    <i class="bi bi-pencil"></i> Sửa
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteStaff(index)">
                    <i class="bi bi-trash"></i> Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staffModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" :class="isEdit ? 'bg-warning' : 'bg-success'">
            <h5 class="modal-title text-white">{{ isEdit ? 'Sửa' : 'Thêm' }} nhân viên</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="isEdit ? updateStaff() : addStaff()">
              <div class="mb-3">
                <label class="form-label fw-bold">Họ và tên *</label>
                <input type="text" v-model="formData.hoTen" class="form-control" required />
              </div>
              <div v-if="!isEdit" class="mb-3">
                <label class="form-label fw-bold">Tên tài khoản *</label>
                <input type="text" v-model="formData.taiKhoan" class="form-control" required minlength="4" />
              </div>
              <div v-if="!isEdit" class="mb-3">
                <label class="form-label fw-bold">Mật khẩu *</label>
                <input type="password" v-model="formData.matKhau" class="form-control" required minlength="3" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Số điện thoại *</label>
                <input type="tel" v-model="formData.soDienThoai" class="form-control" required pattern="[0-9]{10}" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input type="email" v-model="formData.email" class="form-control" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Chức vụ *</label>
                <select v-model="formData.chucVu" class="form-select" required>
                  <option value="">-- Chọn chức vụ --</option>
                  <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                  <option value="Chăm sóc khách hàng">Chăm sóc khách hàng</option>
                  <option value="Kế toán">Kế toán</option>
                </select>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                <button type="submit" :class="isEdit ? 'btn btn-warning' : 'btn btn-success'">
                  {{ isEdit ? 'Cập nhật' : 'Thêm' }}
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
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminSidebar from "@/components/Adminsidebar.vue";

const router = useRouter();

const listNV = ref([
  {
    id: "1",
    hoTen: "Đỗ An Bình",
    taiKhoan: "Binhh",
    matKhau: "Binh123",
    soDienThoai: "0964250706",
    email: "Binhda06811@gmail.com",
    chucVu: "Nhân viên bán hàng"
  },
  {
    id: "2",
    hoTen: "Phạm Công Minh",
    taiKhoan: "Minh",
    matKhau: "Minh123",
    soDienThoai: "0987548374",
    email: "Minh33@gmail.com",
    chucVu: "Chăm sóc khách hàng"
  }
]);

const listNguoiDung = ref([
  {
    id: "1",
    taiKhoan: "admin",
    matKhau: "123",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "admin@company.com",
    vaiTro: "admin"
  },
  {
    id: "2",
    taiKhoan: "khachhang1",
    matKhau: "123",
    hoTen: "Nguyễn Quốc Bảo",
    soDienThoai: "0912345678",
    email: "khachhang@gmail.com",
    vaiTro: "khachhang"
  },
  {
    id: "3",
    taiKhoan: "baobao123",
    matKhau: "baobao123@",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "",
    vaiTro: "khachhang"
  },
  {
    id: "4",
    taiKhoan: "Binh",
    matKhau: "Binh123",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binh123@gmail.co",
    vaiTro: "khachhang"
  },
  {
    id: "5",
    taiKhoan: "Binhh",
    matKhau: "Binh123",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binhda06811@gmail.com",
    vaiTro: "nhanvien"
  },
  {
    id: "6",
    taiKhoan: "Minh",
    matKhau: "Minh123",
    hoTen: "Phạm Công Minh",
    soDienThoai: "0987548374",
    email: "Minh33@gmail.com",
    vaiTro: "nhanvien"
  },
  {
    id: "7",
    taiKhoan: "rttt",
    matKhau: "123456789",
    hoTen: "grtg",
    soDienThoai: "0846375633",
    email: "rehjhjj@gmail.com",
    vaiTro: "khachhang"
  }
]);

const formData = reactive({ 
  id: "", 
  hoTen: "", 
  taiKhoan: "", 
  matKhau: "", 
  soDienThoai: "", 
  email: "", 
  chucVu: "" 
});

const isEdit = ref(false);

function openAddModal() {
  isEdit.value = false;
  Object.assign(formData, { 
    id: "", 
    hoTen: "", 
    taiKhoan: "", 
    matKhau: "", 
    soDienThoai: "", 
    email: "", 
    chucVu: "" 
  });
  new window.bootstrap.Modal(document.getElementById("staffModal")).show();
}

function openEditModal(staff) {
  isEdit.value = true;
  Object.assign(formData, staff);
  new window.bootstrap.Modal(document.getElementById("staffModal")).show();
}

const idCountAuto = ref(2);

function addStaff() {
  if(!confirm("Bạn có muốn thêm nhân viên này không?")) return;
  if (listNguoiDung.value.find((u) => u.taiKhoan === formData.taiKhoan)) {
    alert("Tên tài khoản đã tồn tại!");
    return;
  }
  idCountAuto.value++;
  const newID = idCountAuto.value.toString()

  listNV.value.push({
    ...formData,
    id: newID
  });

 listNguoiDung.value.push({
  ...formData,
  id: newID,
  vaiTro: "Nhân Viên"
 })

  
  window.bootstrap.Modal.getInstance(document.getElementById("staffModal")).hide();
  alert("Thêm nhân viên thành công!");
}

function updateStaff() {
  const index = listNV.value.findIndex(b => b.id === formData.id);
  
  if (index !== -1) {
    listNV.value[index] = {
     ...formData
    };
    
    const userIndex = listNguoiDung.value.findIndex(
      u => u.soDienThoai === formData.soDienThoai && u.vaiTro === "nhanvien"
    );
    
    if (userIndex !== -1) {
      listNguoiDung.value[userIndex] = {
        ...formData,
        vaiTro: "nhanvien"
      };
    }
    
    window.bootstrap.Modal.getInstance(document.getElementById("staffModal")).hide();
    alert("Cập nhật thành công!");
  }
}

function deleteStaff(index) {
  const staff = listNV.value[index];
  const hoTen = staff.hoTen;
  
  if (confirm(`Xóa nhân viên "${hoTen}"?`)) {
    listNV.value.splice(index, 1);
    
    const userIndex = listNguoiDung.value.findIndex(
      u => u.soDienThoai === staff.soDienThoai && u.vaiTro === "nhanvien"
    );
    
    if (userIndex !== -1) {
      listNguoiDung.value.splice(userIndex, 1);
    }
    
    alert(`Xóa nhân viên thành công: ${hoTen}`);
  }
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.vaiTro !== "admin") {
    alert("Bạn không có quyền truy cập!");
    router.push("/");
    return;
  }
});
</script>

<style scoped>
@import "@/assets/admin-layout.css";
</style>