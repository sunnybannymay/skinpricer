<template>
    <div>
        <table>
            <tr>
                <th v-for="key in columns">{{key}}</th>
            </tr>
            <tr v-for="item in items">
                <td>{{item.market_hash_name}}</td>
                <td>{{item.lowest_price}}</td>
                <td>{{item.price}}</td>
                <td>{{item.bitop}} %</td>
                <td>
                    <button @click="addToFav(item)">Add to favs</button>
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
                columns: ['item name', 'lowest price bitskins', 'lowest price opskins', 'BIT/OP (%)', 'OP/BIT (%)'],
                favItemsList:[]
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

                    items: getter_types.GET_ITEMS
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
//                }
                }),
        methods:
            {
                addToFav (itemToAdd) {
                    console.log(itemToAdd);
                    this.$store.dispatch(action_types.ADD_TO_FAVS,itemToAdd)
                }
            },
        created() {
//            this.$store.dispatch(action_types.GET_ITEMS_BITSKINS);
//           this.$store.dispatch(action_types.GET_ITEMS_OPSKINS);
            this.$store.commit(mutation_types.GET_ALL_ITEMS);

        }
    }
</script>

<style>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }

    th {
        background-color: #42b983;
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
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }

    button {
        border-bottom: 2px;
    }
</style>