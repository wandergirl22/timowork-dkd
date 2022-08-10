export default {
  namespaced: true,
  state: {
    Partner:JSON.parse( localStorage.getItem('Partner'))||[]
  },
  mutations: {
    setPartner(state, payload) {
      state.Partner = payload
      localStorage.setItem('Partner',JSON.stringify(state.Partner))
      
     }
  },
  actions: {
    async getPartner(context, payload) { 
      context.commit('setPartner', payload)
      console.log('getPartner', payload);
    }
  },
};
