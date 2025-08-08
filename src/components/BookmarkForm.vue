<script>
export default {
  // 组件数据：定义存储新书签信息的对象
  data() {
    return {
      newBookmark: {  // 存储用户输入的书签信息
        title: '',   // 书签标题
        url: '',     // 书签网址
        category: '' // 书签分类（可选）
      }
    }
  },
  methods: {
    // 添加书签方法
    addBookmark() {
      // 创建新书签对象，包含用户输入数据和自动生成的ID（使用时间戳）
      const bookmark = {
        ...this.newBookmark,  // 展开用户输入的数据
        id: Date.now()         // 用当前时间戳作为唯一ID
      };

      // 触发'add'事件，将新书签传递给父组件
      this.$emit('add', bookmark);

      // 清空表单输入
      this.newBookmark.title = '';
      this.newBookmark.url = '';
      this.newBookmark.category = '';
    }
  }
}
</script>

<template>
  <div class="bookmark-form">
    <h3>添加您的新书签</h3>
    <!-- 表单提交时阻止默认刷新行为，触发addBookmark方法 -->
    <form @submit.prevent="addBookmark">
      <!-- 标题输入框：双向绑定到newBookmark.title -->
      <input
          type="text"
          v-model="newBookmark.title"
          placeholder="书签名称"
          required>  <!-- 必填项 -->

      <!-- 网址输入框：双向绑定到newBookmark.url -->
      <input
          type="url"
          v-model="newBookmark.url"
          placeholder="书签地址"
          required>  <!-- 必填项，浏览器会验证URL格式 -->

      <!-- 分类输入框：双向绑定到newBookmark.category -->
      <input
          type="text"
          v-model="newBookmark.category"
          placeholder="书签分类（可选）">

      <!-- 提交按钮 -->
      <button type="submit">添加书签</button>
    </form>
  </div>
</template>

<style scoped>
.bookmark-form {
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  padding: 28px;
  border-radius: 18px;
  box-shadow: 0 4px 16px 0 rgba(76, 110, 245, 0.18), 0 1.5px 5px 0 rgba(255,193,233,0.14);
  margin-bottom: 36px;
  border: 2.5px solid #f8bbd0;
  position: relative;
  overflow: hidden;
  animation: floatCard 3s infinite ease-in-out alternate;
}

@keyframes floatCard {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-6px) scale(1.01); }
}

h3 {
  margin-top: 0;
  color: #7e57c2;
  font-family: 'Mochiy Pop One', 'Noto Sans SC', 'Avenir', Arial, sans-serif;
  font-size: 2.1em;
  text-shadow: 0 2px 8px #fff4, 0 1px 0 #fff;
  letter-spacing: 2px;
  margin-bottom: 22px;
}

input {
  display: block;
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 18px;
  border: 2px solid #ffe7fa;
  border-radius: 8px;
  font-size: 17px;
  box-sizing: border-box;
  background: rgba(255,255,255,0.85);
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  box-shadow: 0 2px 6px 0 rgba(174, 168, 211, 0.11);
  transition: border-color 0.27s, box-shadow 0.27s;
}

input:focus {
  border-color: #9575cd;
  outline: none;
  box-shadow: 0 0 0 3px #b39ddb66, 0 2px 6px #d1c4e966;
  background: #fff8fa;
}

button {
  background: linear-gradient(92deg, #ea80fc 0%, #8c9eff 100%);
  color: #fff;
  border: none;
  padding: 12px 38px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1.5px;
  font-family: 'Mochiy Pop One', 'Noto Sans SC', Arial, sans-serif;
  box-shadow: 0 3px 12px 0 #e1bee7aa;
  transition: background 0.3s, transform 0.12s;
  position: relative;
  overflow: hidden;
}

button:hover {
  background: linear-gradient(92deg, #b388ff 0%, #f06292 100%);
  transform: translateY(-2px) scale(1.03) rotate(-1.5deg);
  box-shadow: 0 6px 18px 0 #b388ffaa, 0 1.5px 5px #fce4ecaa;
}

.bookmark-form::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 80%;
  width: 120px;
  height: 120px;
  background: radial-gradient(circle at 60% 60%, #ffe082cc, #fffde7cc 80%, transparent 100%);
  filter: blur(12px);
  z-index: 0;
  pointer-events: none;
}

.bookmark-form::after {
  content: '';
  position: absolute;
  bottom: -30px;
  left: -40px;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle at 40% 40%, #e1bee7cc, #fff1f8cc 80%, transparent 100%);
  filter: blur(16px);
  z-index: 0;
  pointer-events: none;
}
</style>