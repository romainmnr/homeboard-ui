<template>
  <div class="page">
    <div class="grid">
      <user-tile />
      <weather-tile />
    </div><!-- end of grid #1 -->
    <div class="grid">
      <tile v-for="tile in page.tiles" :key="tile.id" :config="tile" />
    </div>
  </div>
</template>

<script>
import Tile from './../controls/Tile'
import WeatherTile from '@/components/controls/WeatherTile'
import UserTile from '@/components/controls/UserTile'

import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Tile,
    WeatherTile,
    UserTile
  }
})
export default class Page extends Vue {

  data()
  {
    return {

    }
  }

  mounted(){

  }

  get page ()
  {
    return this.$store.getters.getPage
  }


}
</script>

