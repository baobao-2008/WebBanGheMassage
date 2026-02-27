<template>
  <div class="admin-layout">
    <AdminSidebar currentPage="custorner" />
    <div class="admin-content">
      <div class="container-fluid p-4">
        <h2 class="text-danger fw-bold mb-4"><i class="bi bi-person-fill-gear me-2"></i>Quản lý khách hàng</h2>
        <section class="bg-white rounded shadow-sm p-4">
          <table class="table table-bordered table-hover">
            <thead class="table-dark">
              <tr class="text-center">
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listKH" :key="item.id" class="text-center">
                <td>{{ index + 1 }}</td>
                <td>{{ item.hoTen }}</td>
                <td>{{ item.soDienThoai }}</td>
                <td>{{ item.email || "Chưa có" }}</td>
                <td>{{ item.diaChi || "Chưa có" }}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AdminSidebar from "@/components/Adminsidebar.vue";

const listKH = ref([
  {
    id: "1",
    hoTen: "Trần Thị B",
    soDienThoai: "0912345678",
    email: "tranthib@gmail.com",
    diaChi: "123 Nguyễn Văn Linh, Quận 7, TP.HCM"
  },
  {
    id: "2",
    hoTen: "Lê Văn C",
    soDienThoai: "0909876543",
    email: "levanc@gmail.com",
    diaChi: "456 Lê Lợi, Quận 1, TP.HCM"
  },
  {
    id: "9cc2",
    hoTen: "Văn Nguyễn Quốc Bảo",
    soDienThoai: "0964250706",
    email: "",
    diaChi: ""
  },
  {
    id: "e634",
    hoTen: "Đỗ An Bình",
    soDienThoai: "0964250706",
    email: "Binh123@gmail.co",
    diaChi: ""
  },
  {
    id: "2965",
    hoTen: "grtg",
    soDienThoai: "0846375633",
    email: "rehjhjj@gmail.com",
    diaChi: ""
  }
]);
</script>

<style scoped>
@import "@/assets/admin-layout.css";
</style>