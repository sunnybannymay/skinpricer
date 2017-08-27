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
                   v-model="search"
                   placeholder="Search item"
            @click="addToArray">
            <div class="search-panel__table" v-if="search.length!==0">
                <table class="table-items">
                    <tr>
                        <th class="table-items_header" v-for="key in columns">{{key}}</th>
                    </tr>
                    <tr v-for="item in filteredItems">
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
        </div>
        <table class="table-items" v-if="search.length===0">
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
                isNotActiveTable: false,
                search: '',
                items_arr:[]
            }
        },
        computed:
            {
                items() {
                    return this.$store.getters.GET_ITEMS
                },
                items_fav() {
                    return this.$store.getters.GET_FAVOURITE_ITEMS
                },
                filteredItems: function () {
                    return this.items_arr.filter((item) => {
                        return item.market_hash_name.match(new RegExp(this.search,'gi'));
                    })
                }
            },
        methods:
            {
                addToFav(itemToAdd) {

                    this.$store.dispatch(action_types.ADD_TO_FAVS, itemToAdd)
                },
                addToArray() {
                    this.items_arr=this.$store.state.items;
                    console.log(this.items_arr);
                },
                class_isAdded(item) {
                    if (this.items_fav.findIndex((item_temp) => item_temp.market_hash_name === item.market_hash_name) >= 0) {
                        return {'non-active': true};
                    }
                    else return {'active_button': true};
                }
            },
        mounted() {
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

    .non-active {
        display: none;
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