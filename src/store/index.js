import { createStore } from 'vuex'

import apartmaniModule from './apartmani/index.js'
import korisnikModule from './korisnik/index.js'

const store = createStore({
  modules: {
    apartmani: apartmaniModule,
    korisnik: korisnikModule
  },
  state() {
    return {
      apartmanId: '',
      userId: ''
    }
  },
  getters: {
    apartmanId(state) {
      return state.apartmanId;
    },
    userId(state) {
      return state.userId; 
    }
  },
});

export default store
