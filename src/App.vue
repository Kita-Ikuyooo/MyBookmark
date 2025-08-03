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
  --primary: #ea80fc;
  --primary-dark: #b388ff;
  --secondary: #8c9eff;
  --danger: #ff6b6b;
  --light: #fbc2eb;
  --dark: #7e57c2;
  --gray: #a084ca;
  --anime-bg1: #fbc2eb;
  --anime-bg2: #a6c1ee;
  --anime-shadow: 0 5px 24px 0 rgba(174, 168, 211, 0.18), 0 2px 8px 0 rgba(255,193,233,0.12);
}

body {
  font-family: 'Mochiy Pop One', 'M PLUS Rounded 1c', 'Noto Sans SC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.7;
  background: linear-gradient(120deg, var(--anime-bg1) 0%, var(--anime-bg2) 100%);
  color: #4e3271;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  position: relative;
}

/* 动漫风主卡片 */
.app {
  max-width: 1000px;
  margin: 34px auto 0 auto;
  padding: 36px 28px 18px 28px;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, var(--anime-bg1) 0%, var(--anime-bg2) 100%);
  border-radius: 30px 30px 20px 20px;
  box-shadow: var(--anime-shadow);
  border: 2.5px solid #f8bbd0;
  position: relative;
  overflow: hidden;
  animation: floatAppCard 3.5s infinite ease-in-out alternate;
}

@keyframes floatAppCard {
  0% { transform: translateY(0) scale(1);}
  100% { transform: translateY(-8px) scale(1.012);}
}

.app::before {
  content: '';
  position: absolute;
  top: -48px;
  left: 83%;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle at 60% 60%, #ffe082cc, #fffde7cc 80%, transparent 100%);
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
}

.app::after {
  content: '';
  position: absolute;
  bottom: -44px;
  left: -44px;
  width: 130px;
  height: 130px;
  background: radial-gradient(circle at 40% 40%, #e1bee7cc, #fff1f8cc 80%, transparent 100%);
  filter: blur(16px);
  z-index: 0;
  pointer-events: none;
}

/* 头部动漫风 */
header {
  text-align: center;
  margin-bottom: 36px;
  padding: 26px 0 10px 0;
  z-index: 1;
  position: relative;
}

header h1 {
  color: var(--dark);
  font-size: 2.7rem;
  margin-bottom: 10px;
  letter-spacing: 2.5px;
  text-shadow: 0 2.5px 14px #fff7, 0 1.5px 0 #fff;
  font-family: 'Mochiy Pop One', 'Noto Sans SC', Arial, sans-serif;
  display: inline-flex;
  align-items: center;
}

header h1 i {
  color: var(--primary);
  margin-right: 13px;
  font-size: 1.28em;
  filter: drop-shadow(0 2px 8px #fff6);
}

.subtitle {
  color: var(--gray);
  font-size: 1.22rem;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  letter-spacing: 1px;
  margin-top: 3px;
}

/* 主体内容 */
main {
  flex: 1;
  z-index: 1;
  position: relative;
}

/* 页脚动漫风 */
footer {
  text-align: center;
  padding: 26px 0 14px 0;
  margin-top: 36px;
  color: var(--gray);
  font-size: 1.03rem;
  border-top: 2px dashed #f3e5f5;
  font-family: 'M PLUS Rounded 1c', 'Noto Sans SC', Arial, sans-serif;
  letter-spacing: 1px;
  background: transparent;
  z-index: 1;
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app {
    padding: 11px 5vw 9px 5vw;
  }
  header h1 {
    font-size: 1.5rem;
  }
  .list-header {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  footer {
    font-size: 0.95rem;
    padding: 16px 0 7px 0;
    margin-top: 18px;
  }
}

</style>