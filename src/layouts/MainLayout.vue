<template>
  <div class="main-layout">
    <Header v-if="showLayout" />

    <main class="content-wrapper">
      <router-view />
    </main>

    <Footer v-if="showLayout" />
  </div>
</template>

<script>
// Import các thành phần vào để sử dụng
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { computed } from "vue";

export default {
  name: "MainLayout",
  components: {
    Header,
    Footer,
  },
  computed: {
    showLayout() {
       const hiddenPages = ["/login", "/register"];
      return !hiddenPages.includes(this.$route.path);
    },
  },
};
</script>

<style scoped>
/* Bạn có thể thêm các định dạng chung cho Layout tại đây */
.content-wrapper {
  min-height: 80vh; /* Đảm bảo nội dung luôn chiếm không gian đủ lớn */
  padding-top: 20px;
}
</style>
