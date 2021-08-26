import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
const routes = [{
    path: '*',
    name: 'HelloWorld',
    component: HelloWorld
}]

// const routers = new Router({
//     routes
// })

export default routes