# 常用 SQL 语法

## 目录

- [数据库操作](#数据库操作)
- [表结构操作](#表结构操作)
- [数据新增](#数据新增)
- [数据查询](#数据查询)
- [条件查询](#条件查询)
- [排序与分页](#排序与分页)
- [分组与聚合](#分组与聚合)
- [多表连接](#多表连接)
- [子查询](#子查询)
- [数据更新](#数据更新)
- [数据删除](#数据删除)
- [约束](#约束)
- [索引](#索引)
- [事务](#事务)
- [备份与恢复](#备份与恢复)
- [常用函数](#常用函数)

## 数据库操作

### 查看数据库

```sql
SHOW DATABASES;
```

### 创建数据库

```sql
CREATE DATABASE 数据库名;
CREATE DATABASE 数据库名 DEFAULT CHARACTER SET utf8mb4;
```

### 选择数据库

```sql
USE 数据库名;
```

### 删除数据库

```sql
DROP DATABASE 数据库名;
```

## 表结构操作

### 查看表

```sql
SHOW TABLES;
```

### 查看表结构

```sql
DESC 表名;
SHOW CREATE TABLE 表名;
```

### 创建表

```sql
CREATE TABLE 表名 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  age INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 修改表名

```sql
ALTER TABLE 旧表名 RENAME TO 新表名;
```

### 添加字段

```sql
ALTER TABLE 表名 ADD COLUMN 字段名 数据类型;
```

### 修改字段类型

```sql
ALTER TABLE 表名 MODIFY COLUMN 字段名 新数据类型;
```

### 修改字段名

```sql
ALTER TABLE 表名 CHANGE COLUMN 旧字段名 新字段名 数据类型;
```

### 删除字段

```sql
ALTER TABLE 表名 DROP COLUMN 字段名;
```

### 删除表

```sql
DROP TABLE 表名;
```

## 数据新增

### 指定字段插入

```sql
INSERT INTO 表名 (字段1, 字段2, 字段3)
VALUES (值1, 值2, 值3);
```

```sql
INSERT INTO users (name, age, email)
VALUES ('张三', 18, 'zhangsan@example.com');
```

### 插入多条数据

```sql
INSERT INTO 表名 (字段1, 字段2)
VALUES
  (值1, 值2),
  (值1, 值2),
  (值1, 值2);
```

### 插入查询结果

```sql
INSERT INTO 目标表 (字段1, 字段2)
SELECT 字段1, 字段2 FROM 来源表 WHERE 条件;
```

## 数据查询

### 查询所有字段

```sql
SELECT * FROM 表名;
```

### 查询指定字段

```sql
SELECT 字段1, 字段2 FROM 表名;
```

### 使用别名

```sql
SELECT 字段名 AS 别名 FROM 表名;
SELECT u.name AS username FROM users AS u;
```

### 去重查询

```sql
SELECT DISTINCT 字段名 FROM 表名;
```

## 条件查询

### WHERE 条件

```sql
SELECT * FROM 表名 WHERE 条件;
```

```sql
SELECT * FROM users WHERE age >= 18;
```

### 比较运算

```sql
SELECT * FROM users WHERE age > 18;
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE age < 60;
SELECT * FROM users WHERE age <= 60;
SELECT * FROM users WHERE age <> 18;
```

### 逻辑运算

```sql
SELECT * FROM users WHERE age >= 18 AND status = 'active';
SELECT * FROM users WHERE role = 'admin' OR role = 'editor';
SELECT * FROM users WHERE NOT status = 'disabled';
```

### 范围查询

```sql
SELECT * FROM users WHERE age BETWEEN 18 AND 60;
SELECT * FROM users WHERE id IN (1, 2, 3);
SELECT * FROM users WHERE id NOT IN (1, 2, 3);
```

### 模糊查询

```sql
SELECT * FROM users WHERE name LIKE '张%';
SELECT * FROM users WHERE name LIKE '%三%';
SELECT * FROM users WHERE name LIKE '_三';
```

### 空值判断

```sql
SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;
```

## 排序与分页

### 排序

```sql
SELECT * FROM 表名 ORDER BY 字段名 ASC;
SELECT * FROM 表名 ORDER BY 字段名 DESC;
```

```sql
SELECT * FROM users ORDER BY age DESC, id ASC;
```

### 分页

```sql
SELECT * FROM 表名 LIMIT 条数;
SELECT * FROM 表名 LIMIT 偏移量, 条数;
```

```sql
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 20, 10;
```

## 分组与聚合

### 常用聚合函数

```sql
SELECT COUNT(*) FROM 表名;
SELECT SUM(字段名) FROM 表名;
SELECT AVG(字段名) FROM 表名;
SELECT MAX(字段名) FROM 表名;
SELECT MIN(字段名) FROM 表名;
```

### GROUP BY 分组

```sql
SELECT 分组字段, 聚合函数(字段)
FROM 表名
GROUP BY 分组字段;
```

```sql
SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id;
```

### HAVING 分组后筛选

```sql
SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id
HAVING user_count > 10;
```

## 多表连接

### INNER JOIN 内连接

查询两张表中满足连接条件的数据。

```sql
SELECT u.name, d.name AS department_name
FROM users AS u
INNER JOIN departments AS d ON u.department_id = d.id;
```

### LEFT JOIN 左连接

以左表为主，左表数据全部保留，右表没有匹配时返回 NULL。

```sql
SELECT u.name, d.name AS department_name
FROM users AS u
LEFT JOIN departments AS d ON u.department_id = d.id;
```

### RIGHT JOIN 右连接

以右表为主，右表数据全部保留，左表没有匹配时返回 NULL。

```sql
SELECT u.name, d.name AS department_name
FROM users AS u
RIGHT JOIN departments AS d ON u.department_id = d.id;
```

## 子查询

### WHERE 子查询

```sql
SELECT * FROM users
WHERE department_id = (
  SELECT id FROM departments WHERE name = '技术部'
);
```

### IN 子查询

```sql
SELECT * FROM users
WHERE department_id IN (
  SELECT id FROM departments WHERE status = 'active'
);
```

### FROM 子查询

```sql
SELECT t.department_id, t.user_count
FROM (
  SELECT department_id, COUNT(*) AS user_count
  FROM users
  GROUP BY department_id
) AS t
WHERE t.user_count > 10;
```

## 数据更新

### 更新指定数据

```sql
UPDATE 表名
SET 字段1 = 值1, 字段2 = 值2
WHERE 条件;
```

```sql
UPDATE users
SET age = 20
WHERE id = 1;
```

### 根据已有值更新

```sql
UPDATE users
SET age = age + 1
WHERE id = 1;
```

## 数据删除

### 删除指定数据

```sql
DELETE FROM 表名 WHERE 条件;
```

```sql
DELETE FROM users WHERE id = 1;
```

### 清空表数据

```sql
TRUNCATE TABLE 表名;
```

## 约束

### 主键约束

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);
```

### 非空约束

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);
```

### 唯一约束

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) UNIQUE
);
```

### 默认值约束

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(20) DEFAULT 'active'
);
```

### 外键约束

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  department_id INT,
  CONSTRAINT fk_users_department
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);
```

## 索引

### 创建索引

```sql
CREATE INDEX 索引名 ON 表名 (字段名);
```

```sql
CREATE INDEX idx_users_email ON users (email);
```

### 创建唯一索引

```sql
CREATE UNIQUE INDEX 索引名 ON 表名 (字段名);
```

### 查看索引

```sql
SHOW INDEX FROM 表名;
```

### 删除索引

```sql
DROP INDEX 索引名 ON 表名;
```

## 事务

### 开启事务

```sql
START TRANSACTION;
```

### 提交事务

```sql
COMMIT;
```

### 回滚事务

```sql
ROLLBACK;
```

### 事务示例

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

## 备份与恢复

### 备份单个数据库

```bash
mysqldump -u 用户名 -p 数据库名 > 备份文件.sql
```

```bash
mysqldump -u root -p test > test_backup.sql
```

### 备份指定表

```bash
mysqldump -u 用户名 -p 数据库名 表名 > 备份文件.sql
```

```bash
mysqldump -u root -p test users > users_backup.sql
```

### 备份多个数据库

```bash
mysqldump -u 用户名 -p --databases 数据库名1 数据库名2 > 备份文件.sql
```

```bash
mysqldump -u root -p --databases test shop > backup.sql
```

### 备份所有数据库

```bash
mysqldump -u 用户名 -p --all-databases > 备份文件.sql
```

```bash
mysqldump -u root -p --all-databases > all_backup.sql
```

### 恢复数据库

恢复前需要先创建数据库，并切换到对应数据库。

```sql
CREATE DATABASE 数据库名;
USE 数据库名;
```

```bash
mysql -u 用户名 -p 数据库名 < 备份文件.sql
```

```bash
mysql -u root -p test < test_backup.sql
```

### 在 MySQL 命令行中恢复

```sql
USE 数据库名;
SOURCE 备份文件.sql;
```

### 导出查询结果

```sql
SELECT 字段1, 字段2
FROM 表名
WHERE 条件
INTO OUTFILE '文件路径';
```

### 导入文本数据

```sql
LOAD DATA INFILE '文件路径'
INTO TABLE 表名;
```

## 常用函数

### 字符串函数

```sql
SELECT CONCAT(first_name, last_name) FROM users;
SELECT LENGTH(name) FROM users;
SELECT LOWER(email) FROM users;
SELECT UPPER(code) FROM users;
```

### 数值函数

```sql
SELECT ROUND(price, 2) FROM products;
SELECT CEIL(price) FROM products;
SELECT FLOOR(price) FROM products;
```

### 日期函数

```sql
SELECT NOW();
SELECT CURDATE();
SELECT CURTIME();
SELECT DATE_FORMAT(created_at, '%Y-%m-%d') FROM users;
```

### 条件函数

```sql
SELECT IF(age >= 18, '成年', '未成年') AS age_status FROM users;

SELECT
  name,
  CASE
    WHEN age < 18 THEN '未成年'
    WHEN age < 60 THEN '成年'
    ELSE '老年'
  END AS age_group
FROM users;
```
