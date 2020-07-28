<template lang="html">
  <main>
    <div class="container c-section">
      <div class="row">
          <div class="col-sm-3">

          </div>
          <div class="col-sm-6">
            <div class="a-spacing-top-medium">
              <h3>Add New Condition Typey</h3>
              <form class=""  method="post">
                <div class="a-spacing-top-medium">
                  <label for="">Condition Type</label>
                  <input class="a-input-text" style="width: 100%;" v-model="type">
                </div>

                <div class="a-spacing-top-large">
                  <span class="a-button-register">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onAddProtype">Add Category</span>
                    </span>
                  </span>
                </div>
              </form>
              <br>
              <br>
              <ul class="list-group">
                <li class="list-group-item" v-for="protype in protypes" :key="protype._id">{{ protype.type }}</li>
              </ul>
            </div>
          </div>
          <div class="col-sm-3">

          </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try{
      let response = await $axios.$get("http://localhost:3000/api/protypes");
      return {
        protypes: response.protypes
      }
    } catch(err) {
      console.log(err);
    }
  },


  data(){
    return{
      type: ""
    }
  },

  methods: {
    async onAddProtype(){
      try{
        let data = {type: this.type};
        let response = await this.$axios.$post("http://localhost:3000/api/protypes", data);

          //Push the category input into the <li>
          this.protypes.push(data);

      } catch(err){
        console.log(err);
      }

    }

  }
}
</script>
