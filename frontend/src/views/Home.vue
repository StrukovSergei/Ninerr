<template>
  <section class="home full">
    <Hero />
    <h2>Popular services:</h2>
    <vueper-slides bullets:false class="no-shadow slides-container" :visible-slides="5" slide-multiple :gap="2"
      :slide-ratio="1 / 4" :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
      <vueper-slide v-for="(slide, i) in slides" :key="i" :image="slide.image" :title="slide.title"
        :content="slide.content" />
    </vueper-slides>
  </section>
</template>

<script>

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import Hero from '../cmps/Hero.vue'

export default {
  name: 'home',
  data: () => ({
    slides: [
      {
        title: 'Slide #1',
        content: '',
        image: url('../assets/imgs/1.webp'),
      },
      {
        title: 'Slide #2',
        content: 'Slide 2 content.',
        image: url('../assets/imgs/2.webp'),
      },
      // {
      //   title: 'Slide #3',
      //   content: 'Slide 3 content.',
      //   image: url('../assets/imgs/3.webp'),
      // },
      // {
      //   title: 'Slide #4',
      //   content: 'Slide 4 content.',
      //   image: url('../assets/imgs/4.webp'),
      // },
      // {
      //   title: 'Slide #5',
      //   content: 'Slide 5 content.',
      //   image: url('../assets/imgs/5.webp'),
      // },
      // {
      //   title: 'Slide #6',
      //   content: 'Slide 6 content.',
      //   image: url('../assets/imgs/6.webp'),
      // },
      // {
      //   title: 'Slide #7',
      //   content: 'Slide 7 content.',
      //   image: url('../assets/imgs/7.webp'),
      // },
      // {
      //   title: 'Slide #8',
      //   content: 'Slide 8 content.',
      //   image: url('../assets/imgs/8.webp'),
      // },
      // {
      //   title: 'Slide #9',
      //   content: 'Slide 9 content.',
      //   image: url('../assets/imgs/9.webp'),
      // },
      // {
      //   title: 'Slide #10',
      //   content: 'Slide 10 content.',
      //   image: url('../assets/imgs/10.webp'),
      // }
    ]
  }),
  computed: {
  },
  created() {
  },
  methods: {
  },
  components: { VueperSlides, VueperSlide, Hero },

}
</script>
