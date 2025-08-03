<script>
export default {
  data() {
    return {
      newBookmark: {
        title: '',
        url: '',
        category: ''
      }
    }
  },
  methods: {
    addBookmark() {
      const bookmark = {
        ...this.newBookmark,
        id: Date.now()
      };

      this.$emit('add', bookmark);

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
  <form @submit.prevent="addBookmark">
    <input
      type="text"
      v-model="newBookmark.title"
      placeholder="书签名称"
      required>
    <input
      type="url"
      v-model="newBookmark.url"
      placeholder="书签地址"
      required>
    <input
      type="text"
      v-model="newBookmark.category"
      placeholder="书签分类（可选）">
    <button type="submit">添加书签</button>
  </form>
</div>
</template>

<style scoped>
.bookmark-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

h3 {
  margin-top: 0;
  color: #2c3e50;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

input:focus {
  border-color: #42b983;
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3aa876;
}
</style>