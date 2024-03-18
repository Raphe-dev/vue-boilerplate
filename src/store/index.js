import { reactive } from 'vue';

import http from "@/extensions/http";
import toDict from '@/helpers/dict.js'


const state = reactive({
    pages: {}
});

const actions = {
    async fetchPages() {
        return await http.get('/pages').then(response => {
            mutations.setPages(response.data.data)
        })
    },

    async fetchSingleTypes(types = []) {
        types.forEach(async (type) => {
            await http.get(`${type}?populate=*`).then(response => {
                mutations.setSingleType(response.data.data, type)
            })
        })
        return;
    }
}

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


export default {
        state,
        actions,
        mutations,
        getters
};
