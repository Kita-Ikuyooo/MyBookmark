<script>
import BookmarkItem from "./BookmarkItem.vue";  // 导入书签项子组件

export default {
  components: {
    BookmarkItem  // 注册子组件
  },
  props: {
    // 从父组件接收的书签数组
    bookmarks: {
      type: Array,     // 必须是数组类型
      required: true   // 必须传递此属性
    }
  },
  data() {
    return {
      searchQuery: '',     // 存储搜索关键词
      categoryFilter: ''   // 存储当前选择的分类筛选值
    }
  },
  computed: {
    // 计算属性：获取所有不重复的书签分类
    categories() {
      const categories = new Set();  // 使用Set去重
      this.bookmarks.forEach(bookmark => {
        if (bookmark.category) {
          categories.add(bookmark.category);  // 添加非空分类
        }
      });
      return Array.from(categories).sort();  // 转为数组并排序
    },

    // 计算属性：根据搜索条件和分类筛选书签
    filteredBookmarks() {
      return this.bookmarks.filter(bookmark => {
        // 检查是否匹配搜索词（标题/URL/分类中任一匹配）
        const matchesSearch =
            bookmark.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (bookmark.category && bookmark.category.toLowerCase().includes(this.searchQuery.toLowerCase()));

        // 检查是否匹配当前选择的分类（未选择分类时显示全部）
        const matchesCategory = !this.categoryFilter ||
            (bookmark.category === this.categoryFilter);

        // 同时满足搜索和分类条件
        return matchesSearch && matchesCategory;
      });
    }
  }
}
</script>

<template>
  <div class="bookmark-list">
    <div class="list-header">
      <h2>我的书签</h2>
    </div>

    <!-- 控制区域：搜索和分类筛选 -->
    <div class="controls">
      <!-- 搜索输入框：双向绑定到searchQuery -->
      <input
          type="text"
          v-model="searchQuery"
          placeholder="搜索书签"
          class="search-input">

      <!-- 分类筛选下拉框：双向绑定到categoryFilter -->
      <select v-model="categoryFilter" class="category-sel">
        <option value="">所有分类</option>
        <!-- 动态生成分类选项 -->
        <option v-for="category in categories" :value="category" :key="category">
          {{category}}
        </option>
      </select>
    </div>
  </div>

  <!-- 根据筛选结果显示不同内容 -->
  <div v-if="filteredBookmarks.length" class="bookmarks-container">
    <!-- 遍历显示筛选后的书签 -->
    <BookmarkItem
        v-for="bookmark in filteredBookmarks"
    :key="bookmark.id"
    :bookmark="bookmark"
    @remove="$emit('remove', bookmark.id)"
    />
  </div>

  <!-- 当没有书签时显示的空状态 -->
  <div v-else class="empty-state">
    <i class="fas fa-bookmark"></i>
    <!-- 根据是否有筛选条件显示不同提示 -->
    <p>{{searchQuery || categoryFilter ? '没有匹配的书签' : '暂无书签，请添加'}}</p>
  </div>

  <!-- 书签统计信息 -->
  <div class="stats">
    共 {{bookmarks.length}} 个书签 | 显示 {{filteredBookmarks.length}} 个
  </div>
</template>

<style scoped>
.bookmark-list {
  max-width: 880px;
  margin: 0 auto;
  background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 22px 22px 0 0;
  box-shadow: 0 5px 24px 0 rgba(174, 168, 211, 0.18), 0 2px 8px 0 rgba(255,193,233,0.12);
  padding: 28px 32px 8px 32px;
  position: relative;
  overflow: hidden;
  border: 2.5px solid #f8bbd0;
  animation: floatCard 3.8s infinite ease-in-out alternate;
}

@keyframes floatCard {
  0% { transform: translateY(0) scale(1);}
  100% { transform: translateY(-7px) scale(1.012);}
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 23px;
  flex-wrap: wrap;
  gap: 18px;
}

.list-header h2 {
  color: #7e57c2;
  font-size: 2.22em;
  font-family: 'Mochiy Pop One', 'Noto Sans SC', Arial, sans-serif;
  letter-spacing: 2.2px;
  margin: 0;
  text-shadow: 0 2px 9px #fff4, 0 1px 0 #fff;
}

.controls {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.search-input, .category-sel {
  padding: 11px 18px;
  border: 2px solid #ffe7fa;
  border-radius: 9px;
  font-size: 16px;
  background: rgba(255,255,255,0.8);
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  box-shadow: 0 2px 9px 0 rgba(174, 168, 211, 0.10);
  transition: border-color 0.23s, box-shadow 0.23s;
}

.search-input:focus, .category-sel:focus {
  border-color: #9575cd;
  outline: none;
  box-shadow: 0 0 0 3px #b39ddb55;
  background: #fff8fa;
}

.search-input {
  width: 260px;
  max-width: 100vw;
}

.category-sel {
  min-width: 160px;
}

.bookmarks-container {
  margin-bottom: 24px;
}

.empty-state {
  text-align: center;
  padding: 55px 18px;
  background: linear-gradient(135deg, #f3e5f5 0%, #fffde7 100%);
  border-radius: 15px;
  color: #ba86d7;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  box-shadow: 0 2px 12px #e1bee744;
  margin: 32px 0 24px 0;
  position: relative;
}

.empty-state i {
  font-size: 58px;
  margin-bottom: 17px;
  color: #e1bee7;
  filter: drop-shadow(0 2px 10px #fff6);
}

.stats {
  text-align: right;
  font-size: 15px;
  color: #a084ca;
  padding-top: 13px;
  border-top: 2px dashed #eee8f3;
  margin-top: 0;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  letter-spacing: 0.6px;
}

.bookmark-list::before {
  content: '';
  position: absolute;
  top: -36px;
  left: 84%;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle at 60% 60%, #ffe082cc, #fffde7cc 80%, transparent 100%);
  filter: blur(14px);
  z-index: 0;
  pointer-events: none;
}

.bookmark-list::after {
  content: '';
  position: absolute;
  bottom: -32px;
  left: -40px;
  width: 95px;
  height: 95px;
  background: radial-gradient(circle at 40% 40%, #e1bee7cc, #fff1f8cc 80%, transparent 100%);
  filter: blur(17px);
  z-index: 0;
  pointer-events: none;
}
</style>