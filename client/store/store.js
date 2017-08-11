import Vue from 'vue';
import Vuex from 'vuex';
import items_list from '../api'
import * as types from './mutation-types'

Vue.use(Vuex);
const state = {
    items_bitskins: [],
    items_opskins:[],
    favouriteItemsList: []
};

const getters ={
    getAllItems_bitskins: state=>state.items_bitskins,
    getAllItems_opskins:state=>state.items_opskins
};
const actions = {
    getItemsData_bitskins({ commit }) {
        items_list.getItemsData_bitskins(
            items => { commit(types.UPLOAD_DATA, { items }) }
        )
    },
    getItemsData_opskins({commit}){
        items_list.getItemsData_opskins(
            items=>{commit(types.UPLOAD_DATA_OPSKINS,{items})}
        )
    }
};
const mutations = {
    [types.UPLOAD_DATA](state, { items }) {
        state.items_bitskins = items;
        console.log(state.items_bitskins);
    },
    [types.UPLOAD_DATA_OPSKINS](state,{items}){
        state.items_opskins=items;
        console.log(state.items_opskins);
    }

};
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store