// ...existing code...

// 替换顶级 await
let db;

// 创建初始化函数
async function initDatabase() {
  db = await Database.load("sqlite:reader.db");
}
  // 将依赖于数据库初始化的代码移到这里

// 如果有需要在页面加载时执行的代码
document.addEventListener('DOMContentLoaded', () => {
  // 确保数据库已初始化
  initDatabase().then(() => {
    // 数据库初始化后的操作
    setupUI();
    loadData();
    // ...其他依赖数据库的操作
  }).catch(error => {
    console.error("Error initializing application:", error);
  });
});

// 调用初始化函数
initDatabase().catch(error => {
  console.error("Database initialization failed:", error);
});

// ...existing code...

const checkAndCreateTableSqlite = async (table) => {
  const { tableName, columns } = table;