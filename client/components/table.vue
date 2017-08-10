<template>
    <div>
        <button @click="UpdateData"> Add Data</button>
        <!-- <div>
            <ul>
                <li v-for="item in items_bitskins">
                    {{item.item_name}} {{item.price}} {{item.average_p}}</li>
            </ul>
        </div> -->
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
        items_csgocom:'getAllItems_csgocom'
    }),
    methods: {
        UpdateData() {
            this.$store.dispatch('getItemData')
        },

    },
      created () {
     this.$store.dispatch('getItemData')
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