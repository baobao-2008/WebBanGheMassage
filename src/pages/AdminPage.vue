<template>
  <div class="admin-layout">
    <AdminSidebar currentPage="admin" />

    <div class="admin-content">
      <div class="container-fluid p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="text-danger fw-bold mb-0">
            <i class="bi bi-box-seam me-2"></i>Quản lý sản phẩm
          </h2>
          <button class="btn btn-success" @click="openAddModal">
            <i class="bi bi-plus-circle me-2"></i>Thêm sản phẩm
          </button>
        </div>

        <section class="bg-white rounded shadow-sm p-4">
          <table class="table table-bordered table-hover align-middle">
            <thead class="table-dark">
              <tr class="text-center">
                <th style="width: 80px">STT</th>
                <th style="width: 210px">Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th style="width: 180px">Giá</th>
                <th style="width: 120px">Số lượng</th>
                <th style="width: 180px">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listSP" :key="item.id" class="text-center">
                <td>{{ index + 1 }}</td>
                <td>
                  <img :src="getImagePath(item.hinhAnh)" :alt="item.tenSP"
                    style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px" />
                </td>
                <td>{{ item.tenSP }}</td>
                <td>{{ formatPrice(item.gia) }} VNĐ</td>
                <td>{{ item.soLuong }}</td>
                <td>
                  <button class="btn btn-warning btn-sm me-2" @click="openEditModal(item)">
                    <i class="bi bi-pencil"></i> Sửa
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(index)">
                    <i class="bi bi-trash"></i> Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>

    <!-- Modal Thêm/Sửa -->
    <div class="modal fade" :id="modalId" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-white" :class="isEdit ? 'bg-warning' : 'bg-success'" >
            <h5 class="modal-title">{{ isEdit ? 'Sửa' : 'Thêm' }} sản phẩm</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="isEdit ? updateProduct() : addProduct()">
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
                <label class="form-label fw-bold">Tên hình ảnh <span class="text-danger">*</span></label>
               <input 
  type="file" 
  @change="handleImageUpload" 
  class="form-control" 
  accept="image/*" 
  ref="fileInput"
/>
              </div>
              <div v-if="imagePreview" class="mb-3 text-center">
                <img :src="imagePreview" alt="Preview" 
                  style="max-width: 100%; max-height: 300px; border-radius: 8px" />
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
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import AdminSidebar from "@/components/Adminsidebar.vue";

const router = useRouter();

const listSP = ref([
  {
    id: "1",
    tenSP: "Ghế Massage Poongsan Luxury A1",
    gia: 45000000,
    soLuong: 8,
    hinhAnh: "ghe_massage_2-1768922506276-558747998.webp"
  },
  {
    id: "2",
    tenSP: "Ghế Massage Poongsan MCP-200",
    gia: 32000000,
    soLuong: 0,
    hinhAnh: "ghe_massage_3-1768922518206-767606787.webp"
  },
  {
    id: "3",
    tenSP: "Ghế Massage Trị Liệu PS-300",
    gia: 55000000,
    soLuong: 7,
    hinhAnh: "ghe_massage_3-1768922526972-179220724.webp"
  },
  {
    id: "4",
    tenSP: "Ghế Massage Toàn Thân Gen 4",
    gia: 62000000,
    soLuong: 12,
    hinhAnh: "/Image_ASS/ghe-massage_4.png"
  },
  {
    id: "5",
    tenSP: "Ghế Massage Thông Minh AI-500",
    gia: 75000000,
    soLuong: 4,
    hinhAnh: "ghe_massage_5-1768922538047-83127139.jpg"
  },
  {
    id: "6",
    tenSP: "Ghế Massage Thư Giãn Pro-6",
    gia: 28000000,
    soLuong: 12,
    hinhAnh: "/Image_ASS/ghe-massage_6.png"
  },
  {
    id: "7",
    tenSP: "Ghế Massage Cao Cấp Royal-7",
    gia: 95000000,
    soLuong: 8,
    hinhAnh: "ghe_massage_6-1768922549203-448518549.webp"
  },
  {
    id: "8",
    tenSP: "Ghế Massage Văn Phòng M8",
    gia: 18000000,
    soLuong: 20,
    hinhAnh: "/Image_ASS/ghe-massage_8.png"
  },
  {
    id: "9",
    tenSP: "Ghế Massage Đa Năng S9",
    gia: 42000000,
    soLuong: 7,
    hinhAnh: "/Image_ASS/ghe-massage_9.png"
  },
  {
    id: "10",
    tenSP: "Ghế Massage được sản xuất tại Việt Nam",
    gia: 16990000,
    soLuong: 24,
    hinhAnh: "ghe_massage_7-1768922558117-987022830.webp"
  },
  {
    id: "11",
    tenSP: "rhghtrg",
    gia: 343465,
    soLuong: 31,
    hinhAnh: "ghe_massage_5-1769145143397-960983515.jpg"
  }
]);

const formData = reactive({ id: "", tenSP: "", gia: "", soLuong: "", hinhAnh: "" });
const imagePreview = ref("");
const isEdit = ref(false);
const modalId = "productModal";

watch(() => formData.hinhAnh, (newVal) => {
  if (newVal) {
    imagePreview.value = getImagePath(newVal);
  } else {
    imagePreview.value = "";
  }
});

function formatPrice(value) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function getImagePath(imageName) {
  if (imageName.startsWith("data:image")) return imageName;
  
  if (imageName.startsWith("http") || imageName.startsWith("/")) return imageName;
  
  return `/Image_ASS/${imageName}`;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Vui lòng chọn file hình ảnh!');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Kích thước ảnh không được vượt quá 5MB!');
    return;
  }

  const reader = new FileReader();
  
  reader.onload = (e) => {
    const base64String = e.target.result;
    formData.hinhAnh = base64String; 
    imagePreview.value = base64String; 
  };

  reader.onerror = () => {
    alert('Lỗi khi đọc file ảnh!');
  };

  reader.readAsDataURL(file);
}

function openAddModal() {
  isEdit.value = false;
  Object.assign(formData, { id: "", tenSP: "", gia: "", soLuong: "", hinhAnh: "" });
  imagePreview.value = "";
  new window.bootstrap.Modal(document.getElementById(modalId)).show();
}

function openEditModal(product) {
  isEdit.value = true;
  Object.assign(formData, product);
  imagePreview.value = getImagePath(product.hinhAnh);
  new window.bootstrap.Modal(document.getElementById(modalId)).show();
}

const idCountAuto = ref(11);

function addProduct() {
  if(!confirm("Bạn có muốn thêm sản phẩm này không")) return;
  idCountAuto.value++;
 listSP.value.push(
   {
    ...formData, 
    id: idCountAuto.value
   }
  )
  
  window.bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();
  alert("Thêm sản phẩm thành công!");
}

function updateProduct() {
  const index = listSP.value.findIndex(item => item.id === formData.id);

  if(!confirm('Bạn có muốn cập nhập sản phẩm này không?') )return;

  if (index !== -1) { 
    listSP.value[index] = {
      ...formData
    };
    
    window.bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();
    alert("Cập nhật thành công!");
  }
}

function deleteProduct(index) {
  const tenSP = listSP.value[index].tenSP;
  if(confirm('Bạn có chắc muốn xóa sản phẩm'+tenSP) ){
    listSP.value.splice(index, 1);
    alert("Xóa sản phẩm thành công!");
  }else{
    alert("Xóa sản phẩm thất bại!");
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