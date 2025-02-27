import { ActionContext } from 'vuex'


declare interface GlobalState
{

  userProfile: any
  pages: Array<any>
  page: any
  selectedComponent: any
  isMainOverlayShown: boolean
  isSelectRoomDialogShown: boolean
  isSwipePanelShown: boolean
  swipePanelTab: string
  
}

declare type GlobalActionContext = ActionContext<GlobalState, {}>

const state = () => ({
  userProfile: {},
  pages: [],
  page: {},
  selectedComponent: undefined,
  isMainOverlayShown: false,
  isSelectRoomDialogShown: false,
  isSwipePanelShown: false,
  swipePanelTab: 'page'
  
})

// getters
const getters = {
  getUserProfile: (state: GlobalState) => state.userProfile,
  getPages: (state: GlobalState) => state.pages,
  getPage: (state: GlobalState) => state.page,
  getSelectedComponent: (state: GlobalState) => state.selectedComponent,
  getSwipePanelTab: (state: GlobalState) => state.swipePanelTab,
  isMainOverlayShown: (state: GlobalState) => state.isMainOverlayShown,
  isSelectRoomDialogShown: (state: GlobalState) => state.isSelectRoomDialogShown,
  isSwipePanelShown: (state: GlobalState) => state.isSwipePanelShown,

}

// mutations
const mutations = {
  setUserProfile (state: GlobalState, data: any) {
    state.userProfile = data
  },
  setPageList(state: GlobalState, data: any) {
    state.pages = data
  },
  setCurrentPage(state: GlobalState, data: any) {
    state.page = data
  },
  setMainOverlayStatus(state: GlobalState, data: any) {
    state.isMainOverlayShown = data
  },
  setSelectRoomDialogState(state: GlobalState, data: any) {
    state.isSelectRoomDialogShown = data
  },
  setSwipePanelStatus(state: GlobalState, data: any) {
    state.isSwipePanelShown = data
  },
  setSwipePanelTab(state: GlobalState, data: string) {
    state.swipePanelTab = data
  },
  setSelectedComponent(state: GlobalState, data: any) {
    state.selectedComponent = data
  },
  

}

// actions
const actions = {

  clickMainOverlay(ctx: GlobalActionContext)
  {
    ctx.commit('setMainOverlayStatus', false)
  },

  showSelectRoomDialog(ctx: GlobalActionContext)
  {
    ctx.commit('setSelectRoomDialogState', true)
  },
  hideSelectRoomDialog(ctx: GlobalActionContext)
  {
    ctx.commit('setSelectRoomDialogState', false)
  },

  hideSwipePanel(ctx: GlobalActionContext)
  {
    ctx.commit('setSwipePanelStatus', false)
    ctx.commit('setMainOverlayStatus', false)
    ctx.commit('setSelectedComponent', undefined)
    ctx.commit('setSwipePanelTab', 'page')
  },
  showSwipePanel(ctx: GlobalActionContext, panelTab: string | undefined)
  {
    ctx.commit('setSwipePanelStatus', true)
    if (panelTab) ctx.commit('setSwipePanelTab', panelTab)
    ctx.commit('setMainOverlayStatus', true)
  },

  selectComponent(ctx: GlobalActionContext, config: any)
  {
    ctx.commit('setSelectedComponent', config)
  },

  setSwipePanelTab(ctx: GlobalActionContext, panelTab: string)
  {
    ctx.commit('setSwipePanelTab', panelTab)
  }
}



export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}