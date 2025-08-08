<script>
export default {
  props: {
    // 从父组件接收的单个书签对象
    bookmark: {
      type: Object,     // 必须是对象类型
      required: true    // 必须传递此属性
    }
  },
  computed: {
    // 计算属性：将时间戳格式化为易读日期
    formattedDate() {
      const timestamp = Number(this.bookmark.id);  // 转换ID为数字
      if (isNaN(timestamp)) return '日期无效';     // 无效ID处理

      const date = new Date(timestamp);  // 创建日期对象
      // 格式化为中文日期（例：2025年8月3日）
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',  // 显示年份
        month: 'short',   // 月份简写（如"8月"）
        day: 'numeric'    // 显示日期
      })
    }
  }
}
</script>

<template>
  <div class="bookmark-item">
    <div class="bookmark-content">
      <!-- 书签链接：在新标签页打开 -->
      <a :href="bookmark.url" target="_blank" class="bookmark-link">
        <h3>{{bookmark.title}}</h3>  <!-- 显示书签标题 -->
        <p class="url">{{bookmark.url}}</p>  <!-- 显示URL -->
      </a>

      <!-- 书签元信息 -->
      <div class="bookmark-meta">
        <!-- 显示分类（如果有category） -->
        <span v-if="bookmark.category" class="category">
        {{bookmark.category}}
      </span>
        <!-- 显示格式化后的添加日期 -->
        <span class="date">{{formattedDate}}</span>
      </div>
    </div>

    <!-- 删除按钮：点击时触发remove事件并传递书签ID -->
    <button @click="$emit('remove', bookmark.id)" class="del-btn">
      <i class="fas fa-trash"></i>  <!-- 删除图标 -->
    </button>
  </div>
</template>

<style scoped>
.bookmark-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: linear-gradient(90deg, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 16px;
  box-shadow: 0 3.5px 14px 0 rgba(174, 168, 211, 0.13), 0 1px 4px 0 rgba(255,193,233,0.10);
  margin-bottom: 22px;
  position: relative;
  transition: transform 0.22s, box-shadow 0.22s;
  border: 2px solid #f3e5f5;
  overflow: hidden;
  animation: floatCard 3.5s infinite ease-in-out alternate;
}

@keyframes floatCard {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-4px) scale(1.013); }
}

.bookmark-item:hover {
  transform: translateY(-4px) scale(1.017);
  box-shadow: 0 7px 22px rgba(156, 39, 176, 0.18), 0 2px 8px rgba(255,193,233,0.13);
}

.bookmark-content {
  flex-grow: 1;
  z-index: 1;
}

.bookmark-link {
  text-decoration: none;
  color: #7e57c2;
  font-family: 'Mochiy Pop One', 'Noto Sans SC', Arial, sans-serif;
  transition: color 0.17s;
}

.bookmark-link h3 {
  margin: 0 0 7px 0;
  color: #7e57c2;
  font-size: 1.35em;
  text-shadow: 0 1.5px 6px #fff4, 0 1px 0 #fff;
  letter-spacing: 1.2px;
}

.url {
  margin: 0;
  color: #7c43bd;
  font-size: 14.5px;
  background: rgba(255,255,255,0.37);
  border-radius: 6px;
  padding: 1px 7px 1px 7px;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
  transition: background 0.2s;
}

.bookmark-meta {
  display: flex;
  gap: 13px;
  margin-top: 9px;
  font-size: 13.5px;
  color: #a084ca;
}

.category {
  background: linear-gradient(90deg, #e1bee7 0%, #b39ddb 100%);
  color: #7e57c2;
  padding: 4px 11px;
  border-radius: 16px;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 0.5px 2px #e1bee7aa;
  letter-spacing: 0.5px;
}

.date {
  background: #fff3e0ee;
  color: #ffb74d;
  border-radius: 13px;
  padding: 2px 9px 2px 9px;
  font-size: 12.5px;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  font-weight: 500;
  box-shadow: 0 0.5px 1.5px #ffe0b2aa;
}

.del-btn {
  background: linear-gradient(120deg, #ff80ab 0%, #ea80fc 100%);
  color: #fff;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 9px #ce93d8a9;
  transition: background 0.21s, transform 0.11s;
  font-size: 18px;
  margin-left: 15px;
  z-index: 2;
}

.del-btn:hover {
  background: linear-gradient(120deg, #b388ff 0%, #f06292 100%);
  transform: scale(1.08) rotate(-5deg);
  box-shadow: 0 6px 19px #b388ffaa, 0 1.5px 6px #fce4ecaa;
}

.bookmark-item::before {
  content: '';
  position: absolute;
  top: -28px;
  left: 80%;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle at 55% 60%, #ffe082cc, #fffde7cc 80%, transparent 100%);
  filter: blur(13px);
  z-index: 0;
  pointer-events: none;
}

.bookmark-item::after {
  content: '';
  position: absolute;
  bottom: -22px;
  left: -30px;
  width: 74px;
  height: 74px;
  background: radial-gradient(circle at 40% 40%, #e1bee7cc, #fff1f8cc 80%, transparent 100%);
  filter: blur(11px);
  z-index: 0;
  pointer-events: none;
}
</style>