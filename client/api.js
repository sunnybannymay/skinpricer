import axios from 'axios'

let totp = require('notp').totp;
let base32 = require('thirty-two');
// print out a code that's valid right now
let code =totp.gen(base32.decode('VOKWF3ALZQGNAT3U'));
let apikey='9ed3b079-9f0b-47e3-91ad-0665754e1b30';

// export const results=[    { item_name: "AK-47", price: "73$", average_p: "80$" },
//     { item_name: "AWP", price: "33$", average_p: "34$" },
//     { item_name: "five-seven", price: "10$", average_p: "8$" }];

export default {
   getItemsData(items) {
    axios.get(`https://bitskins.com/api/v1/get_price_data_for_items_on_sale/?api_key=${apikey}&code=${code}`).then(res=>{
        console.log(res);
        return items(res.data.data.items);
    }).catch( error => { console.log(error); });
    }
       // getItemsData(items_bitskins){
       // return items_bitskins(_items)
       // }
}