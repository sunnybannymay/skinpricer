import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';
import * as mutation_types from './mutation-types';
import * as action_types from './action-types';
import * as getter_types from './getter-types';
import axios from 'axios';
import col from 'lodash';

Vue.use(Vuex);
const state = {
    items_bitskins: [],
    items_opskins: [],
    items: [],
    favouriteItemsList: []
};

const getters = {
    [getter_types.GET_ITEMS_BITSKINS]: state => state.items_bitskins,
    [getter_types.GET_ITEMS_OPSKINS]: state => state.items_opskins,
    [getter_types.GET_ITEMS]: state => {
        if (state.items_bitskins.length === 0) store.dispatch(action_types.GET_ITEMS_BITSKINS);
        if (state.items_opskins.length === 0) store.dispatch(action_types.GET_ITEMS_OPSKINS);
        store.commit(mutation_types.GET_ALL_ITEMS);
        return state.items;
    },
    [getter_types.GET_FAVOURITE_ITEMS]: state => state.favouriteItemsList
};
const actions = {
    [action_types.GET_ITEMS_BITSKINS]({commit}) {
        api.getItemsData_bitskins(
            items => {
                commit(mutation_types.UPLOAD_DATA, {items})
            }
        )
    },
    [action_types.GET_ITEMS_OPSKINS]({commit}) {
        api.getItemsData_opskins(
            items => {
                commit(mutation_types.UPLOAD_DATA_OPSKINS, {items})
            }
        )
    },
    [action_types.ADD_TO_FAVS]({commit}, item) {
        commit(mutation_types.ADD_TO_FAVS, {item});
    },
    [action_types.GET_FAV_ITEMS]({commit}){
        axios.get('http://localhost:3000/favItemsList')
            .then((res) => {
            console.log(res);
                commit(mutation_types.GET_FAV_ITEMS, res.data);
            })
            .catch(() => commit('setNotFound'));
    }

};
const mutations = {
    [mutation_types.UPLOAD_DATA](state, {items}) {
        state.items_bitskins = items;
        //console.log(state.items_bitskins);
    },
    [mutation_types.UPLOAD_DATA_OPSKINS](state, {items}) {
        items = _(items) //wrap object so that you can chain lodash methods
            .mapValues((value, market_hash_name) => _.merge({}, value, {market_hash_name})) //attach id to object
            .values() //get the values of the result
            .value();
        state.items_opskins = items;
        //.log(state.items_opskins);
    },
    [mutation_types.GET_ALL_ITEMS](state) {
        state.items = _(state.items_bitskins) // start sequence
            .keyBy('market_hash_name') // create a dictionary of the 1st array
            .merge(_.keyBy(state.items_opskins, 'market_hash_name')) // create a dictionary of the 2nd array, and merge it to the 1st
            .values() // turn the combined dictionary to array
            .value().map((item) => {
                item.price = item.price / 100;
                item.bitop = (item.lowest_price / item.price * 100).toFixed(2);
                item.opbit = (item.price / item.lowest_price * 100).toFixed(2);
                return item;
            });
        console.log(state.items);
    },
    [mutation_types.ADD_TO_FAVS](state, item) {
        console.log('item', item);
        const newItem={
            "market_hash_name":item.market_hash_name,
            "price opskins":item.price,
            "lowest price":item.lowest_price
        };
        console.log(newItem);
        state.favouriteItemsList.push(newItem);
        console.log(state.favouriteItemsList);
        axios.post('http://localhost:3000/favItemsList', newItem);
    },
    [mutation_types.GET_FAV_ITEMS](state, favitems) {
       state.favouriteItemsList=favitems;
       console.log(state.favouriteItemsList);
    },
    setNotFound(state) {
        console.log('ee');
        state.currentCity = {
            temperature: '',
            name: null,
            description: '',
            imgUrl: ''
        };
    }
};
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
export default store