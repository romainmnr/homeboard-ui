<template>
  <div class="swipe-panel" :class="{opened:isSwipePanelShown}" :style="{bottom:panelOffset}">
    <div
      class="drag-line"  
      @click="toggleMenu()" 
      @mousedown="startDrag" 
      @mouseup="stopDrag" />

    <div class="menu-header">
      <div v-if="isSwipePanelShown" class="page-title" v-html="panelTitle" />
      <div v-else class="btn btn-txt btn-black" @click="showSelectRoom()">
        <div v-html="currentPageLabel" />
        <i class="fas fa-chevron-up" />
      </div>

      <div class="blank" @click="toggleMenu()" />
      <div class="linear-switch" :class="{'bg-grey-medium':isSwipePanelShown}">
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: currentTab === 'component'}"
          @click="switchContent('component')">
          <i class="fas fa-box-open" />
        </div>
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: currentTab=== 'page'}"
          @click="switchContent('page')">
          <i class="fas fa-sliders-h" />
        </div>
        <div 
          class="btn btn-circle btn-no-bg no-hover" 
          :class="{active: currentTab=== 'settings'}"
          @click="switchContent('settings') ">
          <i class="fas fa-th" />
        </div>
      </div>
    </div>

    <swipe-panel-settings v-show="currentTab == 'settings' " />
    <swipe-panel-page v-show="currentTab == 'page' " />
    <swipe-panel-component v-show="currentTab == 'component' " />
  </div>
</template>

<script>
import SwipePanelSettings from '@/components/SwipePanel/Panels/SwipePanelSettings'
import SwipePanelPage from '@/components/SwipePanel/Panels/SwipePanelPage'
import SwipePanelComponent from '@/components/SwipePanel/Panels/SwipePanelComponent'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components:{
    SwipePanelSettings,
    SwipePanelPage,
    SwipePanelComponent
  }
})
export default class SwipePanel extends Vue {

  get currentPage()
  {
    return this.$store.getters.getPage
  }

  get userProfile()
  {
    return this.$store.getters.getUserProfile
  }

  get currentPageLabel(){
    return `<i class="${this.currentPage.icon}"></i> ${this.currentPage.name}`
  }
  get isSwipePanelShown()
  {
    return this.$store.getters.isSwipePanelShown
  }
  get panelOffset () 
  {
    return this.isSwipePanelShown ? '0px' : '-70vh'
  }
  get getSelectedComponent()
  {
    return this.$store.getters.getSelectedComponent
  }
  get currentTab()
  {
    return this.$store.getters.getSwipePanelTab
  }
  

  get panelTitle()
  {
    switch (this.currentTab) {
      case 'settings': return '<i class="fas fa-sliders-h"></i> Settings';
      case 'component': return `${this.currentPageLabel} <i class="fas fa-chevron-right"></i> ${this.getSelectedComponent ? this.getSelectedComponent.title: ''}`;
      default: return this.currentPageLabel;
    }
  }

  showSelectRoom () {
    this.$store.dispatch('showSelectRoomDialog')
  }


  toggleMenu () {
    if(this.isSwipePanelShown){
      this.$store.dispatch('hideSwipePanel')
    }else{
      this.$store.dispatch('showSwipePanel')
    }
  }
  switchContent(tab)
  {
    this.$store.dispatch('setSwipePanelTab', tab)
  }

  startDrag(){
    document.addEventListener('mousemove', this.moveCursor);
  }
  stopDrag(){
    document.removeEventListener('mousemove', this.moveCursor);
  }
  moveCursor(){

  }

}

</script>

