<script>
export default {
  props: {
    bookmark: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate() {
      const timestamp = Number(this.bookmark.id);
      if (isNaN(timestamp)) return '日期无效';
      const date = new Date(timestamp);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<template>
<div class="bookmark-item">
  <div class="bookmark-content">
    <a :href="bookmark.url" target="_blank" class="bookmark-link">
      <h3>{{bookmark.title}}</h3>
      <p class="url">{{bookmark.url}}</p>
    </a>
    <div class="bookmark-meta">
      <span v-if="bookmark.category" class="category">{{bookmark.category}}</span>
      <span class="date">{{formattedDate}}</span>
    </div>
  </div>
  <button @click="$emit('remove', bookmark.id)" class="del-btn">
    <i class="fas fa-trash"></i>
  </button>
</div>
</template>

<style scoped>
.bookmark-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.bookmark-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.bookmark-content {
  flex-grow: 1;
}

.bookmark-link {
  text-decoration: none;
  color: inherit;
}

.bookmark-link h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.url {
  margin: 0;
  color: #666;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
}

.bookmark-meta {
  display: flex;
  gap: 15px;
  margin-top: 8px;
  font-size: 13px;
  color: #888;
}

.category {
  background: #e8f4ff;
  color: #3498db;
  padding: 3px 8px;
  border-radius: 12px;
}

.del-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.del-btn:hover {
  background: #ff5252;
}
</style>