<template>
  <div class="contenedor">
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
      :autoplayInterval="3000"
      class="carrousel"
    >
      <template #item="slotProps">
        <div
          class="border-1 surface-border border-round m-2 text-center py-5 px-3"
        >
          <div class="mb-3">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.name"
              class="w-6 shadow-2"
            />
          </div>
          <div>
            <h4 class="mb-1">{{ slotProps.data.name }}</h4>
            <h6 class="mt-0 mb-3">${{ slotProps.data.price }}</h6>
            <Tag :value="slotProps.data.inventoryStatus" />
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "primevue/carousel";
export default {
  components: {
    Carousel,
  },
  setup() {
    const products = [
      {
        name: "Producto 1",
        price: 50.99,
        inventoryStatus: "In Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 2",
        price: 29.99,
        inventoryStatus: "Out of Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 3",
        price: 75.5,
        inventoryStatus: "Low Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 4",
        price: 50.99,
        inventoryStatus: "In Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 5",
        price: 29.99,
        inventoryStatus: "Out of Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 6",
        price: 75.5,
        inventoryStatus: "Low Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 7",
        price: 29.99,
        inventoryStatus: "Out of Stock",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Producto 8",
        price: 75.5,
        inventoryStatus: "Low Stock",
        image: "https://via.placeholder.com/150",
      },
    ];

    // eslint-disable-next-line no-unused-vars
    // const getSeverity = (inventoryStatus) => {
    //   return "info";
    // };

    const responsiveOptions = [
      { breakpoint: "1024px", numVisible: 3, numScroll: 3 },
      { breakpoint: "768px", numVisible: 2, numScroll: 2 },
      { breakpoint: "560px", numVisible: 1, numScroll: 1 },
    ];
    return {
      products,
      responsiveOptions,
    };
  },
};
</script>

<style lang="scss" scoped></style>
