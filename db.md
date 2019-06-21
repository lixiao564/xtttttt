## User

### 基本字段

- `_id` 数据表的唯一表示（数据库自动生成）
- `name` 姓名
- `tel` 手机号
- `email` 邮箱
- `password` 密码（不需要传）
- `dpt` 部门
- `role` 角色

### 新增

`/user/add`

手机号不能重复

### 列表

`/user/list`

### 删除

`/user/delete`

参数名：`_id`

参数值：`Array`类型

## Customer

#### 基本字段

- `_id` 数据表的唯一表示（数据库自动生成）
- `uid` 所属客户经理的 _id 
- `name` 客户名称
- `customerType` 客户类型
- `industryType` 行业类型
- `area` 所属区域
- `validDate` 有效期
- `basicInfo` 单位基本信息

### 新增

`/customer/add`

客户名称不能重复

### 列表

`/customer/list`

### 删除

`/customer/delete`

参数名：`_id`

参数值：`Array`类型