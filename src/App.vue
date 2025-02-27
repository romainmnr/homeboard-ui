<template>
  <div id="homeboard" :key="ts">
    <main-content />
    <swipe-panel v-show="!hideSwipePanel" />
    <select-room-dialog />
  </div>
</template>

<script>

import io from 'socket.io-client';
import { Vue, Component, Watch } from 'vue-property-decorator'
import MainContent from './components/MainContent.vue'
import SwipePanel from './components/SwipePanel/SwipePanel.vue'
import SelectRoomDialog from './components/controls/SelectRoomDialog.vue'

@Component({
  components: {
    MainContent,
    SwipePanel,
    SelectRoomDialog
  }
})
export default class App extends Vue {

  get hideSwipePanel() {
    return this.$route.meta.hideSwipePanel
  }

  get pageList()
  {
    return this.$store.getters.getPages
  }

  get currentPage()
  {
    return this.$store.getters.getPage
  }

  get userProfile()
  {
    return this.$store.getters.getUserProfile
  }

  @Watch('$route', { immediate: true, deep: true })
  onRouteChange()
  {
    this.getCurrentPage()
  }


  data(){
    return {
      isLoading: true,
      ts: 0
    }
  }


  beforeMount(){
    Vue.$socketClient = Vue.prototype.$socketClient = io('http://localhost:3210', {
      path: '/socket'
    });
    
    this.$socketClient.on('pages.getall.reply', pages => {
      this.$store.commit('setPageList', pages)
      this.refreshUi()
    })

    this.$socketClient.on('pages.get.reply', page => {
      this.$store.commit('setCurrentPage', page)
    })

    this.$socketClient.on('user-profiles.select.reply', data => {
      this.$store.commit('setUserProfile', data)
      if(this.$route.query.from){
        this.$router.push({ path: this.$route.query.from})
      }else{
        this.$router.push({ name: 'page', params: { pageId: this.userProfile.dashboardPageId }})
      }
    })

    this.$socketClient.on('user.logout', () => {
      if (this.$route.name !== 'login') this.$router.push({ name: 'login', query: {
        from: this.$route.fullPath
      } })
    })

  }
  refreshUi()
  {
    this.ts = Date.now()
  }

  getCurrentPage()
  {
    if (this.$socketClient) 
    {
      this.$socketClient.emit('pages.get', this.$route.params.pageId);
      this.$socketClient.emit('pages.getall')
    }
  }


}


</script>

<style lang="scss">
@import '@/assets/style.scss';
</style>
