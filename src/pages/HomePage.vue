<template>
  <main>
    <section>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              :src="require('@/assets/images/banners/Banner_1.png')"
              class="d-block w-100 banner-img"
              alt="Banner 1"
            />
          </div>
          <div class="carousel-item">
            <img
              :src="require('@/assets/images/banners/Banner_2.jpg')"
              class="d-block w-100 banner-img"
              alt="Banner 2"
            />
          </div>
          <div class="carousel-item">
            <img
              :src="require('@/assets/images/banners/Banner_3.jpg')"
              class="d-block w-100 banner-img"
              alt="Banner 3"
            />
          </div>
          <div class="carousel-item">
            <img
              :src="require('@/assets/images/banners/Banner_1.png')"
              class="d-block w-100 banner-img"
              alt="Banner 4"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>

    <section>
      <div class="container">
        <div>
          <h4 class="text-danger fw-bold px-3 py-3">Chọn theo mức giá</h4>
        </div>
        <div class="d-flex flex-wrap gap-2 pt-5 pb-5">
          <button class="btn btn-outline-danger fs-5">Từ 5-10 triệu</button>
          <button class="btn btn-outline-danger fs-5">Từ 10-20 triệu</button>
          <button class="btn btn-outline-danger fs-5">Từ 20-30 triệu</button>
          <button class="btn btn-outline-danger fs-5">Từ 30-40 triệu</button>
          <button class="btn btn-outline-danger fs-5">Từ 50-60 triệu</button>
          <button class="btn btn-outline-danger fs-5">Từ 70-80 triệu</button>
          <button class="btn btn-outline-danger fs-5">Từ 90-100 triệu</button>
          <button class="btn btn-outline-danger fs-5">Trên 100 triệu</button>
        </div>
        <div class="d-flex gap-4 pt-3 justify-content-between">
          <div class="d-flex gap-3 pt-3">
            <div class="d-flex gap-2">
              <i class="bi bi-grid text-danger"></i>
              <p class="text-danger">{{ listSP.length }} sản phẩm</p>
            </div>
            <div>
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label px-1 text-danger"> Nổi bật</label>
            </div>
            <div>
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label px-1 text-danger"> Giảm giá</label>
            </div>
          </div>
          <div class="justify-content-end">
            <div class="dropdown">
              <button
                class="btn btn-outline-danger dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
              >
                Sắp xếp theo
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Sắp xếp theo tên</a></li>
                <li>
                  <a class="dropdown-item" href="#">Giá từ thấp đến cao</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Giá từ cao đến thấp</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row pt-5 pb-5">
          <div
            class="col-12 col-sm-6 col-md-4 col-xl-3 pb-3"
            v-for="item in listSP"
            :key="item.id"
          >
            <ProductCard :product="item" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import ProductCard from "../components/ProductCard.vue";

const listSP = ref([
  {
    id: "1",
    tenSP: "Ghế Massage Poongsan Luxury A1",
    gia: 45000000,
    soLuong: 8,
    hinhAnh: "ghe_massage_2-1768922506276-558747998.webp",
  },
  {
    id: "2",
    tenSP: "Ghế Massage Poongsan MCP-200",
    gia: 32000000,
    soLuong: 0,
    hinhAnh: "ghe_massage_3-1768922518206-767606787.webp",
  },
  {
    id: "3",
    tenSP: "Ghế Massage Trị Liệu PS-300",
    gia: 55000000,
    soLuong: 7,
    hinhAnh: "ghe_massage_3-1768922526972-179220724.webp",
  },
  {
    id: "4",
    tenSP: "Ghế Massage Toàn Thân Gen 4",
    gia: 62000000,
    soLuong: 12,
    hinhAnh: "/Image_ASS/ghe-massage_4.png",
  },
  {
    id: "5",
    tenSP: "Ghế Massage Thông Minh AI-500",
    gia: 75000000,
    soLuong: 4,
    hinhAnh: "ghe_massage_5-1768922538047-83127139.jpg",
  },
  {
    id: "6",
    tenSP: "Ghế Massage Thư Giãn Pro-6",
    gia: 28000000,
    soLuong: 12,
    hinhAnh: "/Image_ASS/ghe-massage_6.png",
  },
  {
    id: "7",
    tenSP: "Ghế Massage Cao Cấp Royal-7",
    gia: 95000000,
    soLuong: 8,
    hinhAnh: "ghe_massage_6-1768922549203-448518549.webp",
  },
  {
    id: "8",
    tenSP: "Ghế Massage Văn Phòng M8",
    gia: 18000000,
    soLuong: 20,
    hinhAnh: "/Image_ASS/ghe-massage_8.png",
  },
  {
    id: "9",
    tenSP: "Ghế Massage Đa Năng S9",
    gia: 42000000,
    soLuong: 7,
    hinhAnh: "/Image_ASS/ghe-massage_9.png",
  },
  {
    id: "6c18",
    tenSP: "Ghế Massage được sản xuất tại Việt Nam",
    gia: 16990000,
    soLuong: 24,
    hinhAnh: "ghe_massage_7-1768922558117-987022830.webp",
  },
  {
    id: "4031",
    tenSP: "rhghtrg",
    gia: 343465,
    soLuong: 31,
    hinhAnh: "ghe_massage_5-1769145143397-960983515.jpg",
  },
]);
</script>

<style scoped>
.banner-img {
  height: 500px;
  object-fit: cover;
}
@media (max-width: 768px) {
  .banner-img {
    height: 250px;
  }
}
</style>
