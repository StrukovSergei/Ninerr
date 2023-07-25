<template>
  <section class="container home ">
    <h1 class="text-center">Home Page</h1>
    <h5 class="text-center">Trusted by:</h5>
    <section>
      <h2>Popular services:</h2>
      
    </section>
    <vueper-slides bullets:false class="no-shadow slides-container" :visible-slides="5" slide-multiple :gap="2"
      :slide-ratio="1 / 4" :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
      <vueper-slide bullets:false class="slides" v-for="i in 10" :key="i" :title="i.toString()" />
    </vueper-slides>
  </section>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'home',
  data: () => ({
    slides: [
      {
        title: 'Slide #1',
        content: 'Slide 1 content.'
      },
      {
        title: 'Slide #2',
        content: 'Slide 2 content.'
      },
      {
        title: 'Slide #3',
        content: 'Slide 3 content.'
      },
      {
        title: 'Slide #4',
        content: 'Slide 4 content.'
      },
      {
        title: 'Slide #5',
        content: 'Slide 5 content.'
      },
      {
        title: 'Slide #6',
        content: 'Slide 6 content.'
      },
      {
        title: 'Slide #7',
        content: 'Slide 7 content.'
      },
      {
        title: 'Slide #8',
        content: 'Slide 8 content.'
      },
      {
        title: 'Slide #9',
        content: 'Slide 9 content.'
      },
      {
        title: 'Slide #10',
        content: 'Slide 10 content.'
      }
    ]
  }),
  computed: {
  },
  created() {
  },
  methods: {
  },
  components: { VueperSlides, VueperSlide },

}
</script>
