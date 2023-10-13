import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    jobHistory: [],
    finishingHistory: [],
    jobWorks: [],
    saleOrder: [],
    purchaseOrder: [],
    activePo: {},
    purchases: []
  },
  getters: {
    getjobWorks(state) {
      return state.jobWorks
    },
    getNewJobWorks(state){
      return state.jobWorks.filter(jw => jw.status === 'po_issued')
    },
    getCompletedJobWorks(state){
      return state.jobWorks.filter(jw => jw.status === 'po_completed')
    },
    getSaleOrder(state) {
      return state.saleOrder
    },
    getPurchaseOrder(state) {
      return state.purchaseOrder
    },
    getActivePo(state) {
      return state.activePo
    },
    purchases: state => state.purchases
  },
  mutations: {
    stockIn(state, data) {
      let index = state.issues.findIndex(issue => issue.id === data.issue.id);
      state.issues[index].jobs.push(data.qty);
    },
    Jobwork(state, data) {
      state.jobWorks = data
    },
    saleOrder(state, data) {
      state.saleOrder = data
    },
    purchaseOrder(state, data) {
      state.purchaseOrder = data
    },
    addPurchaseOrder(state, newData) {
      state.purchaseOrder.push(newData)
    },
    updateOrderStatus(state, data) {
      state.jobWorks[data.index] = data.response
    },
    updateSaleOrderStatus(state, data) {
      state.saleOrder[data.index] = data.response
    },
    setPurchases(state, data) {
      state.purchases = data
    }
  },
  actions: {
    finishigNewJob({ commit }, data) {
      commit('finishigNewJob', data)
    },
    fetchJobWorks({ commit }) {
      axios.get('http://192.168.1.133:8001/api/internal/purchaseorders')
        .then(response => {
          if (response.data.status === 'ok') {
            commit('Jobwork', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again');
          }
        })
        .catch((error) => { console.error('fetchJobWorks:', error) })
    },
    fetchSaleOrder({ commit }, data) {
      axios.get('http://192.168.1.133:8003/api/saleorder/' + data.jwoId + '/' + data.fabId)
        .then(response => {
          // commit('saleOrder', response.data.data)
          if (response.data.status === 'ok') {
            console.log('test', response.data.data)
            commit('saleOrder', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message)
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchSaleOrder', error) })
    },
    fetchPurchaseOrder({ commit }) {
      axios.get('http://192.168.1.133:8001/api/internal/purchases')
        .then(response => {
          if (response.data.status === 'ok') { 
            commit('purchaseOrder', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message)
          } else{
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => { console.error('fetchPurchaseOrder', error)})
    },
    acceptPurchaseOrder({ commit }, data) {
      axios.put(`http://192.168.1.133:8001/api/internal/purchaseorders/${data}`, {
        status: 'next'
      })
        .then(response => {
          if (response.data.status === 'ok') { 
            console.log('Jobwork has been accepted:', response.data.data)
            commit('updateOrderStatus', {
              index: data.poIndex,
              response: response.data.data
            })
            this.$router.push('/fabric-accepted');
          } else if (response.data.status === 'error') {
            alert(response.data.message)
          } else {
            alert('Something went wrong! Please try again')
          }
        })
        .catch((error) => {console.error('acceptPurchaseOrder:', error)})
    },
    updateSaleOrderStatus({ commit }, data) {
      axios
        .put('http://192.168.1.133:8003/api/saleorders/' + data.jwoId + '/' + data.fabId, {
          accepter: 'F1'
        })
        .then(response => {
          if (response.data.status === 'ok') {
            console.log('Fabric has been accepted:', response.data.data)
            commit('updateSaleOrderStatus', {
              index: data.soIndex,
              response: response.data.data
            })
          } else if (response.data.status === 'error') {
            alert(response.data.message);
          } else {
            alert('Something went wrong! Please try again');
          }
        })
        .catch((error) => { console.error('updateSaleOrderStatus:', error) })
    },
    fetchPurchases({ commit }) {
      axios.get('http://192.168.1.133:8001/api/internal/purchases')
        .then(response => {
          if (response.data.status === 'ok') { 
            commit('setPurchases', response.data.data)
          } else if (response.data.status === 'error') {
            alert(response.data.message)
          } else{
            alert('Something went wrong! Please try again')
          }
        })
    },
  },
});
