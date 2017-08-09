import Vue from 'vue';
import Vuex from 'vuex';
import items_list from '../../api/api'
import * as types from './mutations/mutation-types'

Vue.use(Vuex);
const state = {
    items: []

};

const getters ={
    getAllItems: state=>state.items
}
const actions = {
    getItemData({ commit }) {
        items_list.getItemsData(
            items => { commit(types.UPLOAD_DATA, { items }) }
        )
    }
};
const mutations = {
    [types.UPLOAD_DATA](state, { items }) {
        state.items = items
    }
};
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store