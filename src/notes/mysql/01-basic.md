# 基础

## 数据库

### 关系型数据库

关系型数据库最典型的数据库结构是表，由二维表及其之间的联系所组成的一个数据组织。可以采用结构化查询语言（SQL）来对数据库进行操作。

- 优点

  1. 易于维护，表结构管理，格式统一
  2. 使用方便，SQL 语言通用，可用于复杂查询
  3. 支持复杂操作，可用于一个表以及多个表之间复杂的查询

- 缺点

  1. 读写性能比较差，尤其是海量数据的高效率读写
  2. 固定的表结构，灵活度稍欠
  3. 高并发读写需求，传统关系型数据库来说，磁盘 I/O 是一个很大的瓶颈

### 非关系型数据库

非关系型数据库也称之为 NoSQL 数据库，是一种数据结构化存储方法的集合，可以是文档或者键值对等

- 优点

  1. 格式灵活：存储数据的格式可以是 key、value 的形式
  2. 速度快，nosql 可以使用硬盘或者随机存储器作为载体，而关系型数据库只能使用硬盘
  3. 高扩展性
  4. 成本低

- 缺点

  1. 不提供 sql 支持
  2. 无事务处理
  3. 数据结构相对复杂，复杂查询方面稍欠

## MySQL 存储数据量

- 32 位系统表文件最大可支持 4GB
- 64 位系统支持最大的表文件 8TB

## SQL Language

结构化查询语言（Structured Query Language），简称 SQL

- DQL：数据库查询语言
  - SELECT
  - FROM
  - WHERE
  - ORDER BY
  - HAVING
- DML：数据库操作语言
  - INSERT：添加数据
  - UPDATE：更新数据
  - DELETE：删除数据
- DDL：数据库定义语言
  - CREATE：创建数据库对象
  - ALTER：修改数据库对象
  - DROP：删除数据库对象
- DCL：数据库控制语言
  - GRANT：授予权限
  - REVOKE：撤销权限
- TCL：事务控制语言
  - COMMIT：提交事务
  - ROLLBACK：回滚事务
  - SAVEPOINT：设置回滚点

## 数据类型

### 整数类型

- tinyint(m)：1 个字节
- smallint(m)：2 个字节
- mediumint(m)：3 个字节
- int(m)：4 个字节
- bigint(m)：8 个字节

### 浮点数类型

- float(m,d)：单精度浮点型，8 位精度（4 字节），m 总个数，d 小数位
- double(m,d)：双精度浮点型，16 位精度（8 字节），m 总个数，d 小数位

### 字符类型

- char(n) 固定长度，最多 255 个字符
- tinytext 可变长度，最多 255 个字符
- varchar(n) 可变长度，最多 65535 个字符
- text 可变长度，最多 65535 个字符
- mediumtext 可变长度，最多 2 的 24 次方-1 个字符
- longtext 可变长度，最多 2 的 32 次方-1 个字符

### 日期类型

- date 日期 YYYY-MM-DD
- time 时间 HH:MM:SS
- datetime 日期时间 YYYY-MM-DD HH:MM:SS
- timestamp 时间戳 YYYYMMDD HHMMSS

### 二进制类型

## 数据库中的约束

### 主键约束 Primary Key

- 单一主键：使用一个列作为主键列，当改列的值有重复时，则违反唯一约束
- 联合主键：使用多个列作为主键列，当多个列的值都相同时，则违反唯一约束

### 外键约束 Foreign Key

### 唯一性约束 Unique

### 非空约束 Not Null

### 检查约束 Check

## SQL 语句

### 创建数据库

> CREATE DATABASE 数据库名 DEFAULT CHARACTER SET 字符编码;

```sql
CREATE DATABASE
test
DEFAULT CHARACTER SET
utf8;
```

### 删除数控

> DROP DATABASE 数据库名称;

```SQL
DROP DATABASE test;
```

### 选择数据库

> USE 数据库名;

```sql
USE test;
```

### 创建表

> CREATE TABLE 表名(列名 类型, 列名 类型......);

```sql
CREATE TABLE employees(
  id INT,
  name VARCHAR(10),
  salary FLOAT(8,2),
);
```

### 查看数据库中所有的表

> SHOW TABLES;

### 删除表

> DROP TABLE 表名;

```sql
DROP TABLE employees;
```

### 修改表名

> ALTER TABLE 旧表名 RENAME 新表名;

### 修改列名

> ALTER TABLE 表名 CHANGE COLUMN 旧列名 新列名 类型;

### 修改列的类型

> ALTER TABLE 表名 MODIFY 列名 新类型;

### 添加新列

> ALTER TABLE 表名 ADD COLUMN 新列名 类型;

### 删除指定的列

> ALTER TABLE 表名 DROP COLUMN 列名;

### 添加主键约束

> ALTER TABLE 表名 ADD PRIMARY KEY(列名);

```sql
ALTER TABLE test ADD PRIMARY KEY(id)
```

### 主键自增长

添加自增长

> ALTER TABLE 表名 MODIFY 主键 类型 AUTO_INCREMENT;

去掉自增长

> ALTER TABLE 表名 MODIFY 主键 类型;

### 删除主键

> ALTER TABLE 表名 DROP PRIMARY KEY;

### 添加外键约束

> ALTER TABLE 表名 ADD CONSTRAINT 约束名 FOREIGN KEY(列名) REFERENCES 参照的表名(参照的列名);

```sql
ALTER TABLE emp ADD CONSTRAINT emp_fk FOREIGN KEY(dept_id) REFERENCES departments(department_id);
```

### 删除外键约束

> ALTER TABLE 表名 DROP FOREIGN KEY 约束名;
