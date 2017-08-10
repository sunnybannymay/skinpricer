import Vue from 'vue';
import Vuex from 'vuex';
import items_list from '../api'
import * as types from './mutation-types'

Vue.use(Vuex);
const state = {
    items_bitskins: [],

};

const getters ={
    getAllItems_bitskins: state=>state.items_bitskins,
};
const actions = {
    getItemData({ commit }) {
        items_list.getItemsData(
            items => { commit(types.UPLOAD_DATA, { items }) }
        )
    }
};
const mutations = {
    [types.UPLOAD_DATA](state, { items }) {
        state.items_bitskins = items;
        console.log(state.items_bitskins);
    }
};
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store