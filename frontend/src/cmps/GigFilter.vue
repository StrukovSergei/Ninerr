<template>

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
  