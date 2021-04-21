import Vue from 'vue'

// import start from '@/micro' 
// start() 主应用配置

// 父子应用通信 方法2 vuex-micro-frontends.

import VueRouter from 'vue-router'
import utils from 'pro-fn-tool'
import App from './App.vue'
import routes from './router'
// import microStore from './store'
// Vue.prototype.microStore = microStore 子应用自己的store 访问时 采用 this.microStore.state.count
Vue.config.productionTip = false
Vue.prototype.$utils = utils
let instance = null
let router = null
    /**
     * 渲染函数
     * 两种情况：主应用生命周期钩子中运行 / 微应用单独启动时运行
     */
function render(props) {
    const store = Vue.observable(props.store)
        // 在 render 中创建 VueRouter，可以保证在卸载微应用时，移除 location 事件监听，防止事件污染
    router = new VueRouter({
        // 运行在主应用中时，添加路由命名空间 /vue
        base: window.__POWERED_BY_QIANKUN__ ? '/micro' : '/',
        mode: 'history',
        routes
    })

    // 挂载应用
    instance = new Vue({
        router,
        store,
        render: (h) => h(App)
    }).$mount('#micro')
}

// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
    render()
}
console.log(window.__POWERED_BY_QIANKUN__, 'window.__POWERED_BY_QIANKUN__')
    /**
     * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
     * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
     */
export async function bootstrap() {
    console.log('VueMicroApp bootstraped')
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
    console.log('VueMicroApp mount', props)
    render(props)
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
    console.log('VueMicroApp unmount')
    instance.$destroy()
    instance = null
    router = null
}