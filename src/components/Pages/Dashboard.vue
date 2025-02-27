<template>
  <div class="dashboard">
    <div class="grid">
      <user-tile />
      <weather-tile />
      <div class="blank-tile" />
    </div><!-- end of grid #1 -->
  </div>
</template>

<script>
import WeatherTile from '@/components/controls/WeatherTile'
import UserTile from '@/components/controls/UserTile'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    WeatherTile,
    UserTile
  }
})
export default class Dashboard extends Vue {

  data()
  {
    return {

    }
  }

  mounted(){

  }


}
</script>

