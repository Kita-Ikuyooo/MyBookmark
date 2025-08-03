<script>
import BookmarkItem from "./BookmarkItem.vue";

export default {
  components: {
    BookmarkItem
  },
  props: {
    bookmarks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      categoryFilter: ''
    }
  },
  computed: {
    categories() {
      const categories = new Set();
      this.bookmarks.forEach(bookmark => {
        if (bookmark.category) {
          categories.add(bookmark.category);
        }
      });
      return Array.from(categories).sort();
    },
    filteredBookmarks() {
      return this.bookmarks.filter(bookmark => {
        const matchesSearch =
            bookmark.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (bookmark.category && bookmark.category.toLowerCase().includes(this.searchQuery.toLowerCase()));
        const matchesCategory = !this.categoryFilter ||
            (bookmark.category === this.categoryFilter);

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
  <div class="controls">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="搜索书签"
      class="search-input">
    <select v-model="categoryFilter" class="category-sel">
      <option value="">所有分类</option>
      <option v-for="category in categories" :value="category" :key="category">{{category}}</option>
    </select>
  </div>
</div>

<div v-if="filteredBookmarks.length" class="bookmarks-container">
    <BookmarkItem
      v-for="bookmark in filteredBookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
      @remove="$emit('remove', bookmark.id)"
    />
</div>

<div v-else class="empty-state">
  <i class="fas fa-bookmark"></i>
  <p>{{searchQuery || categoryFilter ? '没有匹配的书签' : '暂无书签，请添加'}}</p>
</div>

<div class="stats">
  共 {{bookmarks.length}} 个书签 | 显示 {{filteredBookmarks.length}} 个
</div>
</template>

<style scoped>
.bookmark-list {
  max-width: 800px;
  margin: 0 auto;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.search-input, .category-sel {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input {
  width: 250px;
}

.category-sel {
  min-width: 150px;
}

.bookmarks-container {
  margin-bottom: 20px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  background: #f9f9f9;
  border-radius: 8px;
  color: #888;
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 15px;
  color: #ddd;
}

.stats {
  text-align: right;
  font-size: 14px;
  color: #888;
  padding-top: 10px;
  border-top: 1px solid #eee;
}
</style>