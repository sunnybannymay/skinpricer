<template>
    <div>
        <div class="itemsFavourite_show">
            <router-link v-bind:to="'/favourites'">
                <button class="button_favourites">
                    Show favourites
                </button>
            </router-link>
        </div>
        <div class="search-panel">
            <input class="search-panel__input"
                   type="search"
                   placeholder="Search item"
                   @input="searchCity($event.target.value)">
            <div class="search-panel__list">
                <div class="search-panel__list__item" v-for="city in foundedCityList" @click="addToFav(city)">
                    {{ city.name }}
                </div>
            </div>
        </div>
        <table class="table-items">
            <tr>
                <th class="table-items_header" v-for="key in columns">{{key}}</th>
            </tr>
            <tr v-for="item in items">
                <td>{{item.market_hash_name}}</td>
                <td>{{item.lowest_price}}</td>
                <td>{{item.price}}</td>
                <td>{{item.bitop}} %</td>
                <td>{{item.opbit}} %</td>
                <td>
                    <input type="button" @click="addToFav(item)" value="Add to favs" :class="class_isAdded(item)">
                    <!--<label :class="{'IsActiveLabel':item.addedToFav}">Item added to favourites</label>-->
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import * as mutation_types from '../../store/mutation-types';
    import * as action_types from '../../store/action-types';
    import * as getter_types from '../../store/getter-types';

    export default {
        data() {
            return {
                columns: ['item name', 'lowest price bitskins', 'lowest price opskins', 'BIT/OP (%)', 'OP/BIT (%)', 'Add to favs'],
                favItemsList: [],
                isActiveLabel: false
//                items: () => {
//                    let items = _(this.items_bitskins) // start sequence
//                        .keyBy('market_hash_name') // create a dictionary of the 1st array
//                        .merge(_.keyBy(this.items_opskins, 'market_hash_name')) // create a dictionary of the 2nd array, and merge it to the 1st
//                        .values() // turn the combined dictionary to array
//                        .value();
//                    console.log(items);
//                    return items;
                //}
            }
        },
        computed:
            mapGetters(
                {

                    items: getter_types.GET_ITEMS,
                    items_fav: getter_types.GET_FAVOURITE_ITEMS
//                    addedtofav: ()=>{
//                        return
//                    }
//                percentBitOps: () => {
//                    var sortKey = this.sortKey;
//                    var filterKey = this.filterKey && this.filterKey.toLowerCase();
//                    var order = this.sortOrders[sortKey] || 1;
//                    var data = this.data;
//                    if (filterKey) {
//                        data = data.filter(function (row) {
//                            return Object.keys(row).some(function (key) {
//                                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
//                            })
//                        })
//                    }
//                    if (sortKey) {
//                        data = data.slice().sort(function (a, b) {
//                            a = a[sortKey];
//                            b = b[sortKey];
//                            return (a === b ? 0 : a > b ? 1 : -1) * order
//                        })
//                    }
//                    return data
//                }</div>
                }),

        methods:
            {
                addToFav(itemToAdd) {

                    this.$store.dispatch(action_types.ADD_TO_FAVS, itemToAdd)
                },
                showPreloader() {
                    if (this.$store.commit(mutation_types.UPLOAD_DATA))
                        return true;
                },
                class_isAdded(item) {
                    if (this.items_fav.findIndex((item_temp) => item_temp.market_hash_name === item.market_hash_name) >= 0) {
                        return {'non-active_button': true};
                    }
                    else return {'active_button': true};
                }
        }
        ,
        mounted() {
//            this.$store.dispatch(action_types.GET_ITEMS_BITSKINS);
//           this.$store.dispatch(action_types.GET_ITEMS_OPSKINS);
            this.$store.commit(mutation_types.GET_ALL_ITEMS);
            this.$store.dispatch(action_types.GET_FAV_ITEMS);
        }
    }
</script>

<style lang="scss">
    $maincolor: #42b983;
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid $maincolor;
        border-radius: 3px;
        background-color: #fff;
    }

    th {
        background-color: $maincolor;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
        .arrow {
            opacity: 1;
        }
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
        &.asc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 4px solid #fff;
        }
        &.dsc {
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-top: 4px solid #fff;
        }
    }

    .button_favourites {
        text-decoration: none;
        text-align: center;
        padding: 11px 32px;
        border: solid 1px $maincolor;
        -webkit-border-radius: 19px;
        -moz-border-radius: 19px;
        border-radius: 19px;
        font: 18px Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: $maincolor;
        background: #ffffff;
        margin-bottom: 30px;
    }

    .active_button {
        text-decoration: none;
        text-align: center;
        padding: 11px 32px;
        border: solid 1px $maincolor;
        -webkit-border-radius: 19px;
        -moz-border-radius: 19px;
        border-radius: 19px;
        font: 15px Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: $maincolor;
        background: #eafff6;
    }

    .non-active_button {
        display: none;
    }

    .isActiveLabel {
        text-align: center;
        font: 15px Arial, Helvetica, sans-serif;
        color: $maincolor;
    }

    .search-panel {
        &__input {
            background: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
            padding: 15px 15px;
            display: block;
            width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, helvetica, 'helvetica neue', Ubuntu, 'segoe ui', arial, sans-serif;
            font-size: 16px;
            border-radius: 5px;
        }

        &__list {
            &__item {
                padding: 8px 15px;
                margin: 0 -15px;
                color: #323232;
                cursor: pointer;
                border-radius: 5px;
                transition: background ease-in-out 150ms;

                &:hover {
                    background: rgba(0, 0, 0, 0.08);
                }
            }
        }
    }
</style>