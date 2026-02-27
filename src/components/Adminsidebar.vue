<template>
  <div class="admin-sidebar">
    <div class="sidebar-header">
      <h5 class="text-white mb-0">
        <i class="bi bi-speedometer2 me-2"></i>Admin menu
      </h5>
    </div>

    <nav class="sidebar-nav">
      <a href="#" @click.prevent="router.push('/')" class="nav-item">
        <i class="bi bi-house-door-fill"></i>
        <span>Trang chủ</span>
      </a>

      <a href="#" @click.prevent="router.push('/admin')" 
         :class="['nav-item', { active: currentPage === 'admin' }]">
        <i class="bi bi-box-seam"></i>
        <span>Quản lý sản phẩm</span>
      </a>

      <a v-if="canAccessCustomers" href="#" @click.prevent="router.push('/custorner')" 
         :class="['nav-item', { active: currentPage === 'custorner' }]">
        <i class="bi bi-person-fill-gear"></i>
        <span>Quản lý khách hàng</span>
      </a>

      <a v-if="canAccessBills" href="#" @click.prevent="router.push('/bill')" 
         :class="['nav-item', { active: currentPage === 'bill' }]">
        <i class="bi bi-building-gear"></i>
        <span>Quản lý hóa đơn</span>
      </a>

      <a v-if="canAccessStaff" href="#" @click.prevent="router.push('/staff')" 
         :class="['nav-item', { active: currentPage === 'staff' }]">
        <i class="bi bi-person-workspace"></i>
        <span>Quản lý nhân viên</span>
      </a>

      <a href="#" @click.prevent="router.push('/pos')" 
         :class="['nav-item', { active: currentPage === 'pos' }]">
        <i class="bi bi-cart-check"></i>
        <span>Bán hàng tại quầy</span>
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  currentPage: String
});

const router = useRouter();

const user = ref(null);
const staff = ref(null);

const isAdmin = computed(() => user.value?.vaiTro === "admin");
const canAccessCustomers = computed(() => isAdmin.value || staff.value?.chucVu === "Chăm sóc khách hàng");
const canAccessBills = computed(() => isAdmin.value || staff.value?.chucVu === "Nhân viên bán hàng");
const canAccessStaff = computed(() => isAdmin.value);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user") || "{}");
  staff.value = JSON.parse(localStorage.getItem("staffInfo") || "{}");
});
</script>

<style scoped>
@import "@/assets/admin-sidebar.css";
</style>