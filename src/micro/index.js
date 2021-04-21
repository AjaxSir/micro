// 主页用配置
import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from 'qiankun'

import apps from './apps'

registerMicroApps(apps, {
    beforeLoad() { // 微应用挂载前
        console.log('beforeLoad')
        return Promise.resolve()
    },
    afterMount() { // 微应用挂载后
        console.log('afterMount')
        return Promise.resolve()
    }
})

addGlobalUncaughtErrorHandler(error => {
    console.log(error, 'error')
        // const { message } = error
        // if (message && message.includes('died in status LOADING_SOURCE_CODE')) {
        //     message.error('微应用加载失败，请检查应用是否可运行')
        // }
})
export default start