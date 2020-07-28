<template lang="html">
  <main>
    <div class="container">
      <div class="row">
        <div class="col-md-3">

        </div>
        <div class="col-md-6 text-center">
          <div class="a-section">
            <div class="a-spacing-top-medium">
            </div>
            <h2>Add a new Product</h2>
            <form class="" action="" method="post">

              <!-- category dropdown -->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" name="" v-model="categoryID">
                  <option v-for="category in categories" :value="category._id" :key="category._id">{{ category.type }}</option>
                </select>
              </div>

              <!-- Owner dropdown -->
              <div class="a-spacing-top-medium d-none">
                <label>Owner</label>
                <select class="a-select-option" name="" v-model="ownerID">
                  <option v-for="owner in owners" :value="owner._id" :key="owner._id">{{ owner.name }}</option>
                </select>
              </div>

              <!-- Owner dropdown -->
              <div class="a-spacing-top-medium">
                <label>Condition</label>
                <select class="a-select-option" name="" v-model="conditionID">
                  <option v-for="condition in conditions" :value="condition._id" :key="condition._id">{{ condition.type }}</option>
                </select>
              </div>

              <div class="a-spacing-top-medium">
                <label>Product Type</label>
                <select class="a-select-option" name="" v-model="protypeID">
                  <option v-for="protype in protypes" :value="protype._id" :key="protype._id">{{ protype.type }}</option>
                </select>
              </div>


              <!-- Title dropdown -->
              <div class="a-spacing-top-medium">
                <label for="">Title</label>
                <input type="text" name="" value="" class="a-input-text" style="width: 100%" v-model="title">
              </div>

              <!-- Price dropdown -->
              <div class="a-spacing-top-medium">
                <label for="">Price</label>
                <input type="text" name="" value="" class="a-input-text" style="width: 100%" v-model="price">
              </div>

              <!-- stockQuantity dropdown -->
              <div class="a-spacing-top-medium">
                <label for="">Stock Quantity</label>
                <input type="text" name="" value="" class="a-input-text" style="width: 100%" v-model="stockQuantity">
              </div>

              <!-- desc dropdown -->
              <div class="a-spacing-top-medium">
                <label for="">Description</label>
                <textarea placeholder="Description for the Product here" style="width: 100%" v-model="description"></textarea>
              </div>

              <!-- Photo dropdown -->
              <div class="a-spacing-top-medium">
                <label for="">Add Photo</label>
                <div class="a-row a-spacing-top-medium">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected"/>
                    <!-- <p style="margin-top: -70px">tes</p> -->
                  </label>
                </div>
              </div>

              <hr>
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onAddProduct">Add Product</span>
                  </span>
                </span>
              </div>

            </form>
          </div>
        </div>
        <div class="col-md-3">

        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
async asyncData({ $axios }){
  try {

      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");
      let conditions = $axios.$get("http://localhost:3000/api/conditions");
      let protypes = $axios.$get("http://localhost:3000/api/protypes");


      const [catResponse, ownerResponse, conResponse, proResponse] = await Promise.all([categories, owners, conditions, protypes]);

      console.log(catResponse);

      return {
        categories: catResponse.categories,
        owners: ownerResponse.owners,
        conditions: conResponse.conditions,
        protypes: proResponse.protypes
      };
    }
    catch(err) {
      console.log(err);
    }
  },

  data() {
    return {
      categoryID: null,
      ownerID: null,
      protypeID: null,
      title: "",
      price: 0,
      stockQuantity: 1,
      description: "",
      selectedFile: null,
      fileName: ""

    };
  },

  methods: {
    onFileSelected(event){
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },

    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("price", this.price);
      data.append("description", this.description);
      data.append("categoryID", this.categoryID);
      data.append("protypeID", this.protypeID);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      data.append("stockQuantity", this.stockQuantity);

      let result =  await this.$axios.$post("http://localhost:3000/api/products", data);

      this.$router.push("/");
    }
  }

};
</script>
