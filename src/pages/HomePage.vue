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
              alt="..."
              style="height: 500px; object-fit: cover"
            />
          </div>
          <div class="carousel-item">
            <img
              :src="require('@/assets/images/banners/Banner_2.jpg')"
              class="d-block w-100"
              alt="..."
              style="height: 500px; object-fit: cover"
            />
          </div>
          <div class="carousel-item">
            <img
              :src="require('@/assets/images/banners/Banner_3.jpg')"
              class="d-block w-100"
              alt="..."
              style="height: 500px; object-fit: cover"
            />
          </div>
          <div class="carousel-item">
            <img
              :src="require('@/assets/images/banners/Banner_1.png')"
              class="d-block w-100"
              alt="..."
              style="height: 500px; object-fit: cover"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <section>
      <div class="container">
        <div>
          <h4 class="text-danger fw-bold px-3 py-3">Chọn theo mức giá</h4>
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn btn-outline-dark fs-5">Từ 5-10 triệu</button>
          <button class="btn btn-outline-dark fs-5">Từ 10-20 triệu</button>
          <button class="btn btn-outline-dark fs-5">Từ 20-30 triệu</button>
          <button class="btn btn-outline-dark fs-5">Từ 30-40 triệu</button>
          <button class="btn btn-outline-dark fs-5">Từ 50-60 triệu</button>
          <button class="btn btn-outline-dark fs-5">Từ 70-80 triệu</button>
          <button class="btn btn-outline-dark fs-5">Từ 90-100 triệu</button>
          <button class="btn btn-outline-dark fs-5">Trên 100 triệu</button>
        </div>
        <div class="d-flex gap-4 pt-3 justify-content-between">
          <div class="d-flex gap-3 pt-3">
            <div class="d-flex gap-2">
              <i class="bi bi-grid"></i>
              <p>{{ listSP.length }} sản phẩm</p>
            </div>
            <div>
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label">Nổi bật</label>
            </div>
            <div>
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label">Giảm giá</label>
            </div>
          </div>
          <div class="justify-content-end">
            <div class="dropdown">
              <button
                class="btn btn-outline-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sắp xếp theo
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a class="dropdown-item" href="#">Sắp xếp theo tên</a>
                </li>
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
          <div class="col-3 pb-3" v-for="item in listSP" :key="item.id">
            <ProductCard :product="item" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "HomePage",
  components: {
    ProductCard,
  },
  data() {
    return {
      listSP: [], // Nơi chứa 10 sản phẩm
    };
  },
  mounted() {
    //Gọi dữ liệu ngay khi trang web vừa tải xong
    this.getProducts();
  },
  methods: {
    getProducts() {
      axios
        .get("http://localhost:3000/SanPham")
        .then((response) => {
          this.listSP = response.data; // Gán dữ liệu trả về vào listSP
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu:", error);
        });
    },
  },
};
</script>
