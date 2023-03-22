import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

export default createStore({
 
  state: {
    user:{},
  },
  plugins: [
    createPersistedState()
  ],
  getters: {

      getUser:state=>state.user
    
  },
  mutations: {
    setLoginResponse(state,payload)
    {
      state.user=payload;
    }
  },
  actions: {
  },
  modules: {
  },
  
})
