<template>
  <div class="app">
    <header>
      <h1><i class="fas fa-bookmark"></i>我的书签收藏夹</h1>
      <p class="subtitle">轻松保存和管理您喜欢的网站</p>
    </header>

    <main>
      <BookmarkForm @add="addBookmark" />
      <BookmarkList
          :bookmarks="bookmarks"
          @remove="removeBookmark"/>
    </main>

    <footer>
      <p>© 2025 我的书签 | 已保存 {{ bookmarks.length }} 个书签</p>
    </footer>
  </div>
</template>

<script>
import BookmarkForm from './components/BookmarkForm.vue';
import BookmarkList from './components/BookmarkList.vue';

export default {
  components: {
    BookmarkForm,
    BookmarkList
  },
  data() {
    return {
      bookmarks: []
    }
  },
  mounted() {
    this.loadBookmarks();
  },
  methods: {
    // 添加书签
    addBookmark(bookmark) {
      this.bookmarks.push(bookmark);
      this.saveBookmarks();
    },

    // 删除书签
    removeBookmark(id) {
      this.bookmarks = this.bookmarks.filter(b => b.id !== id);
      this.saveBookmarks();
    },

    // 保存到本地存储
    saveBookmarks() {
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
    },

    // 从本地存储加载
    loadBookmarks() {
      const saved = localStorage.getItem('bookmarks');
      if (saved) {
        this.bookmarks = JSON.parse(saved);
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #42b983;
  --primary-dark: #3aa876;
  --secondary: #3498db;
  --danger: #ff6b6b;
  --light: #f8f9fa;
  --dark: #2c3e50;
  --gray: #888;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background-color: #f0f2f5;
  color: #333;
  padding: 0;
  margin: 0;
}

.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
}

header h1 {
  color: var(--dark);
  font-size: 2.5rem;
  margin-bottom: 10px;
}

header h1 i {
  color: var(--primary);
  margin-right: 10px;
}

.subtitle {
  color: var(--gray);
  font-size: 1.1rem;
}

main {
  flex: 1;
}

footer {
  text-align: center;
  padding: 20px 0;
  margin-top: 30px;
  color: var(--gray);
  font-size: 0.9rem;
  border-top: 1px solid #eee;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app {
    padding: 15px;
  }

  header h1 {
    font-size: 2rem;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input {
    width: 100%;
  }
}
</style>