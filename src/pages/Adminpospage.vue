<template>
  <div class="admin-layout">
    <AdminSidebar currentPage="pos" />
    <div class="admin-content">
      <div class="container-fluid p-4">
        <h2 class="text-danger fw-bold mb-4"><i class="bi bi-cart-check me-2"></i>Bán hàng tại quầy</h2>
        <div class="row">
          <div class="col-lg-7">
            <section class="bg-white rounded shadow-sm p-4">
              <input type="text" v-model="search" class="form-control mb-3" placeholder="Tìm sản phẩm..." />
              <div class="product-grid">
                <div v-for="p in filteredProducts" :key="p.id" class="product-card" @click="addToCart(p)">
                  <img :src="getImg(p.hinhAnh)" :alt="p.tenSP" class="product-image" />
                  <h6 class="product-name">{{ p.tenSP }}</h6>
                  <p class="product-price">{{ formatPrice(p.gia) }} đ</p>
                  <p class="product-stock">Kho: {{ p.soLuong }}</p>
                </div>
              </div>
            </section>
          </div>
          <div class="col-lg-5">
            <section class="bg-white rounded shadow-sm p-4">
              <h5 class="fw-bold">Giỏ hàng</h5>
              <input type="text" v-model="cusName" class="form-control mb-2" placeholder="Tên khách hàng" />
              <input type="tel" v-model="cusPhone" class="form-control mb-3" placeholder="Số điện thoại" />
              <hr />
              <div class="cart-items">
                <div v-if="cart.length === 0" class="text-center text-muted py-4">
                  <i class="bi bi-cart-x" style="font-size:48px"></i>
                  <p>Giỏ hàng trống</p>
                </div>
                <div v-for="(item, i) in cart" :key="i" class="cart-item">
                  <div>
                    <h6>{{ item.tenSP }}</h6>
                    <small>{{ formatPrice(item.gia) }} đ</small>
                  </div>
                  <div class="d-flex gap-2">
                    <div class="quantity-control">
                      <button class="btn btn-sm btn-outline-secondary" @click="item.qty > 1 ? item.qty-- : null">-</button>
                      <span class="px-2">{{ item.qty }}</span>
                      <button class="btn btn-sm btn-outline-secondary" @click="item.qty < item.soLuong ? item.qty++ : null">+</button>
                    </div>
                    <button class="btn btn-sm btn-danger" @click="cart.splice(i, 1)"><i class="bi bi-trash"></i></button>
                  </div>
                </div>
              </div>
              <hr />
              <div class="d-flex justify-content-between mb-3">
                <span>Tổng cộng:</span>
                <strong class="text-danger fs-5">{{ formatPrice(total) }} đ</strong>
              </div>
              <button class="btn btn-success w-100 mb-2" @click="pay" :disabled="cart.length === 0">
                <i class="bi bi-check-circle me-2"></i>Thanh toán
              </button>
              <button class="btn btn-outline-danger w-100" @click="clear">Hủy đơn</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminSidebar from "@/components/Adminsidebar.vue";

const products = ref([
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
    id: "6c18",
    tenSP: "Ghế Massage được sản xuất tại Việt Nam",
    gia: 16990000,
    soLuong: 24,
    hinhAnh: "ghe_massage_7-1768922558117-987022830.webp"
  },
  {
    id: "4031",
    tenSP: "rhghtrg",
    gia: 343465,
    soLuong: 31,
    hinhAnh: "ghe_massage_5-1769145143397-960983515.jpg"
  }
]);

const cart = ref([]);
const search = ref("");
const cusName = ref("");
const cusPhone = ref("");

const filteredProducts = computed(() => {
  return products.value.filter(p => 
    p.tenSP.toLowerCase().includes(search.value.toLowerCase()) && p.soLuong > 0
  );
});

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.gia * item.qty, 0);
});

function getImg(img) {
  return img.startsWith("http") || img.startsWith("/") ? img : `/Image_ASS/${img}`;
}

function formatPrice(v) {
  return new Intl.NumberFormat("vi-VN").format(v);
}

function addToCart(p) {
  const existing = cart.value.find(item => item.id === p.id);
  if (existing) {
    if (existing.qty < p.soLuong) {
      existing.qty++;
    } else {
      alert("Không đủ hàng!");
    }
  } else {
    cart.value.push({ ...p, qty: 1 });
  }
}

function clear() {
  if (confirm("Hủy đơn hàng?")) {
    cart.value = [];
    cusName.value = "";
    cusPhone.value = "";
  }
}

function pay() {
  if (!cusName.value.trim() || !cusPhone.value.trim()) {
    alert("Vui lòng nhập thông tin khách hàng!");
    return;
  }
  
  for (const item of cart.value) {
    const productIndex = products.value.findIndex(x => x.id === item.id);
    if (productIndex !== -1) {
      products.value[productIndex].soLuong -= item.qty;
    }
  }
  
  const maHD = `HD${Date.now()}`;
  alert(`Thanh toán thành công!\nMã HĐ: ${maHD}\nTổng: ${formatPrice(total.value)} đ`);
  
  cart.value = [];
  cusName.value = "";
  cusPhone.value = "";
}
</script>

<style scoped>
@import "@/assets/admin-layout.css";
@import "@/assets/admin-pos.css";
</style>