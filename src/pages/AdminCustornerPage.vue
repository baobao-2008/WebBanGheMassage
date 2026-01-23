<template>
  <div class="container mt-4">
    <h2 class="text-danger fw-bold mb-4">Quản lý khách hàng</h2>

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
          v-if="canAccessProducts"
          class="btn btn-success d-flex align-items-center gap-2"
          @click="openAdminProduct"
        >
          <i class="bi bi-box-seam"></i>
          <span>Trang quản lý sản phẩm</span>
        </button>

        <button
          v-if="canAccessBills"
          class="btn btn-secondary text-white d-flex gap-2"
          @click="openAdminBillPage"
        >
          <i class="bi bi-building-gear"></i>
          <span>Quản lý hóa đơn</span>
        </button>

        <button
          v-if="canAccessStaff"
          class="btn btn-dark text-white d-flex gap-2"
          @click="openAdminStaffPage"
        >
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
              <th>Họ và tên</th>
              <th style="width: 150px">Số điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listKH" :key="item.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="align-middle">{{ item.hoTen }}</td>
              <td class="align-middle text-center">{{ item.soDienThoai }}</td>
              <td class="align-middle">{{ item.email || "Chưa có" }}</td>
              <td class="align-middle">{{ item.diaChi || "Chưa có" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminCustornerPage",
  data() {
    return {
      currentUser: null,
      staffInfo: null,
      listKH: [], 
    };
  },

  mounted() {
    this.loadUserInfo();
    
    const isAdmin = this.currentUser && this.currentUser.vaiTro === "admin";
    const isCSKH = this.staffInfo && this.staffInfo.chucVu === "Chăm sóc khách hàng";
    
    console.log("Kiểm tra quyền truy cập:");
    console.log("- Là admin:", isAdmin);
    console.log("- Là CSKH:", isCSKH);
    console.log("- Chức vụ:", this.staffInfo?.chucVu);
    
    if (!isAdmin && !isCSKH) {
      alert("Bạn không có quyền truy cập trang Quản lý Khách hàng!");
      this.$router.push("/");
      return;
    }
    
    this.getCustomers();
  },

  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.vaiTro === "admin";
    },

    canAccessProducts() {
      return this.isAdmin;
    },

    canAccessCustomers() {
      if (this.isAdmin) return true;
      if (this.staffInfo) {
        return this.staffInfo.chucVu === "Chăm sóc khách hàng";
      }
      return false;
    },

    canAccessBills() {
      if (this.isAdmin) return true;
      if (this.staffInfo) {
        return this.staffInfo.chucVu === "Nhân viên bán hàng";
      }
      return false;
    },

    canAccessStaff() {
      return this.isAdmin;
    },
  },

  methods: {
    loadUserInfo() {
      const userStr = localStorage.getItem("user");
      const staffStr = localStorage.getItem("staffInfo");

      if (userStr) {
        this.currentUser = JSON.parse(userStr);
      }

      if (staffStr) {
        this.staffInfo = JSON.parse(staffStr);
      }

      console.log("Current User:", this.currentUser);
      console.log("Staff Info:", this.staffInfo);
    },

    async getCustomers() {
      try {
        const response = await axios.get("http://localhost:3000/KhachHang");
        this.listKH = response.data;
        console.log("Đã tải danh sách khách hàng:", this.listKH.length);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      }
    },

    openAdminBillPage() {
      if (this.canAccessBills) {
        this.$router.push("/bill");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Hóa đơn!");
      }
    },

    openAdminProduct() {
      if (this.canAccessProducts) {
        this.$router.push("/admin");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Sản phẩm!");
      }
    },

    openAdminStaffPage() {
      if (this.canAccessStaff) {
        this.$router.push("/staff");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Nhân viên!");
      }
    },

    goToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>