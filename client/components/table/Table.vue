<template>
    <div>
        <!--<div class="itemsFavourite">-->
        <!--<div class="search-panel">-->
        <!--<input class="search-panel__input"-->
        <!--type="search"-->
        <!--placeholder="Search item"-->
        <!--v-on:input="searchItem($event.target.value)">-->
        <!--</div>-->
        <span class="itemsFavourite_show">
                <router-link v-bind:to="'/favourites'">
                    <button>
                        Show favourites
                    </button>
                </router-link>
            </span>
        <table class="items-table">
            <tr>
                <th v-for="key in columns">{{key}}</th>
            </tr>
            <tr v-for="item in items">
                <td>{{item.market_hash_name}}</td>
                <td>{{item.lowest_price}}</td>
                <td>{{item.price}}</td>
                <td>{{item.bitop}} %</td>
                <td>{{item.opbit}} %</td>
                <td>
                    <button @click="addToFav(item)" :class="{active: !checkItem(item)}">Add to favs</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {star_icon} from './star-icon.png'
    import {mapGetters, mapActions} from 'vuex';
    import * as mutation_types from '../../store/mutation-types';
    import * as action_types from '../../store/action-types';
    import * as getter_types from '../../store/getter-types';

    export default {
        data() {
            return {
                columns: ['item name', 'lowest price bitskins', 'lowest price opskins', 'BIT/OP (%)', 'OP/BIT (%)', 'Add to favs'],
                favItemsList: [],
                isActive: false
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
                    console.log('itemToAdd', itemToAdd);
                    this.$store.dispatch(action_types.ADD_TO_FAVS, itemToAdd)
                },
                showPreloader() {
                    if (this.$store.commit(mutation_types.UPLOAD_DATA))
                        return true;
                },
                checkItem(item) {
                    _.findIndex(this.$store.state.favItemsList, (favitem) => item.market_hash_name === favitem.market_hash_name)
            }
//                },
//                searchItem(value) {
//                    this.$store.dispatch(action_types.SEARCH_ITEM, value)
//                        .then((res) => {
//                            this.favItemsList = res.filter((foundItem) => {
//                                // If city already in favourite list - delete it
//                                const index = this.$store.state.favItemsList
//                                    .findIndex((favItem) => foundItem.id === favItem.id);
//                                return index === -1;
//                            });
//                        })
//                        .catch(() => this.favItemsList = []);
//                }
    }
    ,
    created()
    {
//            this.$store.dispatch(action_types.GET_ITEMS_BITSKINS);
//           this.$store.dispatch(action_types.GET_ITEMS_OPSKINS);
        this.$store.commit(mutation_types.GET_ALL_ITEMS);

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

    button {
        text-decoration: none;
        text-align: center;
        padding: 11px 32px;
        border: solid 1px #42b983;
        -webkit-border-radius: 19px;
        -moz-border-radius: 19px;
        border-radius: 19px;
        font: 10px Arial, Helvetica, sans-serif;
        font-weight: bold;
        color: $maincolor;
        background: #ffffff;
        -webkit-box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
        -moz-box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
        box-shadow: 0px 0px 2px #bababa, inset 0px 0px 1px #ffffff;
    }

    .active {
        background-color: aqua;
    }
</style>