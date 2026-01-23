<template>
  <div class="container mt-4">
    <h2 class="text-danger fw-bold mb-4">Quản lý hóa đơn</h2>

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
          v-if="canAccessCustomers"
          class="btn btn-info text-white d-flex gap-2"
          @click="openAdminCustornerPage"
        >
          <i class="bi bi-person-fill-gear"></i>
          <span>Quản lý Khách hàng</span>
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

    <section></section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "AdminBillPage",
  data() {
    return {
      currentUser: null,
      staffInfo: null,
    };
  },

  mounted() {
    this.loadUserInfo();
    
    const isAdmin = this.currentUser && this.currentUser.vaiTro === "admin";
    const isSales = this.staffInfo && this.staffInfo.chucVu === "Nhân viên bán hàng";
    
    if (!isAdmin && !isSales) {
      alert("Bạn không có quyền truy cập trang Quản lý Hóa đơn!");
      this.$router.push("/");
      return;
    }
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

    openAdminBillPage() {
      if (this.canAccessBills) {
        this.$router.push("/bill");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Hóa đơn!");
      }
    },

    openAdminCustornerPage() {
      if (this.canAccessCustomers) {
        this.$router.push("/custorner");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Khách hàng!");
      }
    },

    openAdminStaffPage() {
      if (this.canAccessStaff) {
        this.$router.push("/staff");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Nhân viên!");
      }
    },

    openAdminProduct() {
      if (this.canAccessProducts) {
        this.$router.push("/admin");
      } else {
        alert("Bạn không có quyền truy cập trang Quản lý Sản phẩm!");
      }
    },

    goToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>