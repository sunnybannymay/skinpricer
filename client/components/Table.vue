<template>
    <div>
        <button @click="ShowFavourites"> Add Data</button>
         <table>
                        <caption>Items prices</caption>
                        <tr>
                            <th>item name</th>
                            <th>price</th>
                            <th>average price</th>
                        </tr>
                        <tr v-for="item in items_bitskins">
                            <td>{{item.market_hash_name}}</td>
                            <td>{{item.total_items}}</td>
                            <td>{{item.average_p}}</td>
                            <td></td>
                        </tr>
                    </table> 
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed:
    mapGetters({
        items_bitskins: 'getAllItems_bitskins',
        items_opskins:'getAllItems_opskins'
    }),
    methods: {
        ShowFavourites() {

        },

    },
      created () {
     this.$store.dispatch('getItemsData_bitskins'),
         this.$store.dispatch('getItemsData_opskins')
  }
} 
</script>

<style lang="scss">
// table {
//     $red: red;
//     border-color: yellowgreen;
//     border: 0.5cm;
//     background-color: $red
// }
</style>