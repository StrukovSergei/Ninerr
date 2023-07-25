<template>
    <section >
      <el-input
        v-focus
        v-model="txt"
        @input="setFilterTxt"
        style="width: 250px"
        placeholder="Search toy..."
        :prefix-icon="search"
      />
  

    </section>
  </template>
  
  <script>

  
  export default {
    name: 'gig-filter',
    data() {
      return {
        txt: '',

      }
    },
    methods: {
      setFilterTxt() {
        this.$emit('filteredTxt', this.txt)
      },


    },
    computed: {

      search() {
        return Search
      },
    },
  }
  </script>
  