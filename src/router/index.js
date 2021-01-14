import Vue from 'vue'
import Router from 'vue-router'
import WindowsList from '../components/window/WindowsList.vue';
import RoomList from '../components/room/RoomsList.vue';
import CreateWindow from '../components/window/CreateWindow.vue';

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/window',
            name: 'window',
            component: WindowsList
        },
        {
            path: '/room',
            name: 'room',
            component: RoomList
        },
        {
            path: '/create-window',
            name: 'create-window',
            component: CreateWindow
        },
        {
            path: '/window:roomId',
            name: 'room-window',
            component: WindowsList
        },

    ]
})