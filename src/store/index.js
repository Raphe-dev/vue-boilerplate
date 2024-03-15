import { ref, reactive } from 'vue';

import http from "@/extensions/http";
import toDict from '@/helpers/dict.js'


const state = reactive({
    pages: {}
});

const mutations = {
    setPages(data) {
        let pages = data
        pages = pages.reduce((dic, item) => {
            dic[item.attributes.Name] = {...toDict(item.attributes), id: item.id}
            return dic;
        }, {})
        state.pages = pages
    },

    setSingleType(data, key) {
        let object = data
        object.attributes = {...toDict(object.attributes) }
        state[key] = object
    }
};

const getters = {
};

const actions = {
    async fetchPages() {
        return await http.get('/pages').then(response => {
            mutations.setPages(response.data.data)
        })
    },

    async fetchSingleTypes() {
        return await http.get('faq?populate=*').then(response => {
            mutations.setSingleType(response.data.data, 'faq')
        })
    }
}

export default {
        state,
        actions,
        mutations,
        getters
};
