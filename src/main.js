import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBookmark, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 添加图标库
library.add(faBookmark, faTrash)

// 创建Vue应用
const app = createApp(App)

// 注册全局组件
app.component('font-awesome-icon', FontAwesomeIcon)

// 挂载应用
app.mount('#app')