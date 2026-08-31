# MySQL 基础

## 目录

- [数据库基础](#数据库基础)
  - [关系型数据库](#关系型数据库)
  - [非关系型数据库](#非关系型数据库)
  - [MySQL 存储数据量](#mysql-存储数据量)
- [SQL 语言分类](#sql-语言分类)
- [MySQL 数据类型](#mysql-数据类型)
  - [整数类型](#整数类型)
  - [浮点数类型](#浮点数类型)
  - [字符类型](#字符类型)
  - [日期类型](#日期类型)
  - [二进制类型](#二进制类型)
- [数据库约束](#数据库约束)
  - [主键约束 Primary Key](#主键约束-primary-key)
  - [外键约束 Foreign Key](#外键约束-foreign-key)
  - [唯一性约束 Unique](#唯一性约束-unique)
  - [非空约束 Not Null](#非空约束-not-null)
  - [检查约束 Check](#检查约束-check)
- [DDL：数据库与表结构](#ddl数据库与表结构)
  - [创建数据库](#创建数据库)
  - [删除数据库](#删除数据库)
  - [选择数据库](#选择数据库)
  - [创建表](#创建表)
  - [查看数据库中所有的表](#查看数据库中所有的表)
  - [删除表](#删除表)
  - [修改表名](#修改表名)
  - [修改列名](#修改列名)
  - [修改列的类型](#修改列的类型)
  - [添加新列](#添加新列)
  - [删除指定的列](#删除指定的列)
  - [主键约束](#主键约束)
  - [外键约束](#外键约束)
  - [唯一性约束](#唯一性约束)
  - [非空约束（Not Null）](#非空约束not-null)
  - [查询表的约束信息](#查询表的约束信息)
  - [查看表的信息](#查看表的信息)
- [DML：数据增删改](#dml数据增删改)
  - [添加数据（INSERT）](#添加数据insert)
  - [默认值处理（DEFAULT）](#默认值处理default)
  - [更新数据（UPDATE）](#更新数据update)
  - [删除数据（DELETE）](#删除数据delete)
- [DQL：查询语句](#dql查询语句)
  - [选择所有列](#选择所有列)
  - [指定列](#指定列)
  - [查询中的算术表达式](#查询中的算术表达式)
  - [别名](#别名)
  - [去除重复](#去除重复)
  - [条件查询](#条件查询)
  - [比较条件](#比较条件)
  - [逻辑条件](#逻辑条件)
  - [优先规则](#优先规则)
  - [ORDER BY 排序](#order-by-排序)
  - [SELECT 语句执行顺序](#select-语句执行顺序)

## 数据库基础

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

### MySQL 存储数据量

- 32 位系统表文件最大可支持 4GB
- 64 位系统支持最大的表文件 8TB

## SQL 语言分类

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

## MySQL 数据类型

### 整数类型

- tinyint(m)：1 个字节
- smallint(m)：2 个字节
- mediumint(m)：3 个字节
- int(m)：4 个字节
- bigint(m)：8 个字节

### 浮点数类型

- float(m,d)：单精度浮点型，8 位精度（4 字节），m 总个数，d 小数位
- double(m,d)：双精度浮点型，16 位精度（8 字节），m 总个数，d 小数位
- decimal(m,d)：双精度浮点型，16 位精度（8 字节），m 总个数，d 小数位

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

## 数据库约束

### 主键约束 Primary Key

- 单一主键：使用一个列作为主键列，当改列的值有重复时，则违反唯一约束
- 联合主键：使用多个列作为主键列，当多个列的值都相同时，则违反唯一约束

### 外键约束 Foreign Key

### 唯一性约束 Unique

### 非空约束 Not Null

### 检查约束 Check

## DDL：数据库与表结构

### 创建数据库

> CREATE DATABASE 数据库名 DEFAULT CHARACTER SET 字符编码;

```sql
CREATE DATABASE
test
DEFAULT CHARACTER SET
utf8;
```

### 删除数据库

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

### 主键约束

- 添加主键

> ALTER TABLE 表名 ADD PRIMARY KEY(列名);

```sql
ALTER TABLE test ADD PRIMARY KEY(id)
```

- 添加自增长

> ALTER TABLE 表名 MODIFY 主键 类型 AUTO_INCREMENT;

- 去掉自增长

> ALTER TABLE 表名 MODIFY 主键 类型;

- 删除主键

> ALTER TABLE 表名 DROP PRIMARY KEY;

### 外键约束

- 添加外键

> ALTER TABLE 表名 ADD CONSTRAINT 约束名 FOREIGN KEY(列名) REFERENCES 参照的表名(参照的列名);

```sql
ALTER TABLE emp ADD CONSTRAINT emp_fk FOREIGN KEY(dept_id) REFERENCES departments(department_id);
```

- 删除外键

> ALTER TABLE 表名 DROP FOREIGN KEY 约束名;

### 唯一性约束

- 添加唯一性约束

> ALTER TABLE 表名 ADD CONSTRAINT 约束名 UNIQUE(列名);

```sql
ALTER TABLE emp ADD CONSTRAINT emp_uk UNIQUE(name);
```

- 删除唯一性约束

> ALTER TABLE 表名 DROP KEY 约束名;

```sql
ALTER TABLE emp DROP KEY emp_uk;
```

### 非空约束（Not Null）

- 添加非空约束

> ALTER TABLE 表名 MODIFY 列名 类型 NOT NULL;

- 删除非空约束

> ALTER TABLE 表名 MODIFY 列名 类型 NULL;

### 查询表的约束信息

> SHOW KEYS FROM 表名;

### 查看表的信息

> DESC 表名;

## DML：数据增删改

### 添加数据（INSERT）

- 选择插入

> INSERT INTO 表名(列名 1, 列名 2, 列名 3...) VALUES (值 1, 值 2, 值 3...);

```sql
INSERT INTO deps(name, location_id) VALUES("张三", 1);
```

- 完全插入

> INSERT INTO 表名 VALUES(值 1, 值 2, 值 3...)

注意主键如果是自动增长，需要使用 default 或者 null 或者 0 占位。

```sql
INSERT INTO deps VALUES(DEFAULT, "李四", 2)
```

### 默认值处理（DEFAULT）

- 创建的时候添加默认值

> CREATE TABLE 表名(列名 类型 DEFAULT 默认值, ...);

```sql
CREATE TABLE emps(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(10),
  address VARCHAR(50) DEFAULT 'Unknown'
);
```

- 修改的时候添加默认值

> ALTER TABLE 表名 ADD COLUMN 列名 类型 DEFAULT 默认值;

- 插入数据时候默认值处理

需要使用 default 来占位

```sql
INSERT INTO emps VALUES(DEFAULT, 'a', DEFAULT);
```

### 更新数据（UPDATE）

> UPDATE 表名 SET 列名=值, 列名=值 WHERE 条件;

更新语句中一定要给定更新条件，否则表中所有的数据都会被更新

```sql
UPDATE emps SET address='北京' WHERE id=1;
```

### 删除数据（DELETE）

- 删除数据

> DELETE FROM 表名 WHERE 条件;

在 DELETE 语句中，如果没有给定删除条件，则会删除表中的所有数据。

- 清空表

> TRUNCATE TABLE 表名;

两者区别

- truncate 是整体删除(速度较快)，delete 是逐条删除（速度较慢）
- truncate 不写服务器 log，delete 写服务器 log
- truncate 是会重置自增值，相当于自增列会被置为初始值，又重新从 1 开始记录。而 delete 删除以后，自增值仍然会继续累加

## DQL：查询语句

### 选择所有列

> SELECT \* FROM 表名;

### 指定列

> SELECT 列名, 列名 FROM 表名;

### 查询中的算术表达式

> SELECT 列名, 列名 + 300 FROM 表名;

```sql
SELECT name, salary, salary + 300 FROM employees;
```

### 别名

- 使用列别名

> SELECT 列名 AS 列别名 FROM 表名 WHERE 条件;
> SELECT 列名 列别名 FROM 表名 WHERE 条件;

- 使用表别名

> SELECT 表别名.列名 FROM 表名 AS 表别名 WHERE 条件;
> SELECT 表别名.列名 FROM 表名 表别名 WHERE 条件;

```sql
SELECT emp.last_name name FROM employees emp;
```

### 去除重复

> SELECT DISTINCT 列名 FROM 表名;

```sql
SELECT DISTINCT department_id FROM employees;
```

### 条件查询

> SELECT \* | 投影列 FROM 表名 WHERE 选择条件;

### 比较条件

- >
- <
- > =
- =
- <=
- != 、 <>
- BETWEEN ... AND ... 在两个值之间(包含)

```sql
SELECT last_name, salary
FROM employees
WHERE salary BETWEEN 2500 AND 3500;
```

- IN(set) 匹配一个任意值列表

```sql
SELECT employee_id, last_name, salary, manager_id
FROM employees
WHERE manager_id IN(100, 101, 201);
```

- LIKE 匹配一个字符串模板
  - `%` 表示 0 个或多个字符
  - `_` 表示一个字符

```sql
SELECT first_name
FROM employees
WHERE first_name LIKE 'S%';
```

- NULL 条件
  - IS NULL 是一个空值
  - IS NOT NULL

```sql
SELECT last_name, manager_id
FROM employees
WHERE manager_id IS NULL;
```

### 逻辑条件

- AND

```sql
SELECT last_name, salary FROM employees WHERE salary = 8000 AND last_name LIKE '%e%';
```

- OR

```sql
SELECT last_name, salary FROM employees WHERE salary = 8000 OR last_name LIKE '%e%';
```

- NOT

```sql
SELECT last_name FROM employees WHERE last_name NOT LIKE '%u%';
```

### 优先规则

1. 算术运算
2. 连字操作
3. 比较操作
4. IS [NOT] NULL, LIKE, [NOT] IN
5. [NOT] BETWEEN
6. NOT 逻辑条件
7. AND 逻辑条件
8. OR 逻辑条件

使用圆括号改变优先规则

### ORDER BY 排序

- `ASC` 升序排序，默认
- `DESC` 降序排序

```sql
SELECT last_name, job_id, department_id, hire_date
FROM employees
ORDER BY hire_date;
```

```sql
SELECT department_id, salary FROM employees ORDER BY department_id ASC, salary DESC;
```

### SELECT 语句执行顺序

1. FROM 子句
2. WHERE 子句
3. SELECT 子句
4. ORDER BY 子句
