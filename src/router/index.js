import Vue from 'vue'
import Router from 'vue-router'
import WindowsList from '../components/window/WindowsList.vue';
import HeaterList from '../components/heater/HeaterList.vue';
import RoomList from '../components/room/RoomsList.vue';
import CreateWindow from '../components/window/CreateWindow.vue';

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            component: RoomList
        },
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
            path: '/window:roomId',
            name: 'room-window',
            component: WindowsList
        },
        {
            path: '/heater',
            name: 'heater',
            component: HeaterList
        },
        {
            path: '/heater:roomId',
            name: 'room-heater',
            component: HeaterList
        },
    ]
})