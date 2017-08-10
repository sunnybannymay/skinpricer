import Vue from 'vue';
import Tablet from './components/table';
import store from './store/store';

const app = new Vue({
    components: {
        Tablet
    },
    render: h=>h(Tablet),
    store
});
export {app}