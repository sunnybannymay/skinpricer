<template>

    <div class="page">
        <ul>
            <li v-for="item in favItemsList">{{item.market_hash_name}}</li>
        </ul>
        <!--<div class="search-panel">-->
        <!--<input class="search-panel__input"-->
        <!--type="search"-->
        <!--placeholder="Search city"-->
        <!--v-on:input="searchItem($event.target.value)">-->
        <!--<div class="search-panel__list">-->
        <!--<div class="search-panel__list__item" v-for="city in foundedCityList" @click="addToFav(city)">-->
        <!--{{ city.name }}-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<router-link v-bind:to="'/city/' + city.name" class="city-card__content">-->
        <!--<div class="city-card__content__status-icon"-->
        <!--v-bind:style="{ 'background-image': 'url(' + city.icon_url + ')' }"></div>-->
        <!--<div class="city-card__content__condition">{{city.conditionText}}</div>-->
        <!--<div class="city-card__content__temperature">{{city.temperature}}°C</div>-->
        <!--<div class="city-card__content__title">{{city.name}}</div>-->
        <!--</router-link>-->
    </div>
</template>
<script>
    import axios from 'axios';
    import * as action_types from '../store/action-types';
    import * as getter_types from '../store/getter-types';
    import * as mutation_types from '../store/mutation-types';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        methods: {
//            searchItem: (value) => {
//                this.$store.dispatch([action_types.SEARCH_ITEM], value);
////                    .then((res) => {
////                        this.foundedCityList = res.filter((foundCity) => {
////// If city already in favourite list - delete it
////                            const index = this.$store.state.favouriteCityList
////                                .findIndex((favCity) => foundCity.id === favCity.id);
////                            return index === -1;
////                        });
////                    })
////                    .catch(() => this.foundedCityList = []);
//            },
        },
        computed:
            mapGetters({
                favItemsList: getter_types.GET_FAVOURITE_ITEMS
            }),
        data: function () {
            return {
                foundedCityList: []
            }
        },
        mounted() {
            this.$store.dispatch(action_types.GET_FAV_ITEMS);
        }
    };
</script>