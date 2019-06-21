## User

#### 基本字段

- `_id` 数据表的唯一表示（数据库自动生成）
- `name` 姓名
- `tel` 手机号
- `email` 邮箱
- `password` 密码（不需要传）
- `dpt` 部门
- `role` 角色

#### 新增

`/user/add`

#### 列表

`/user/list`

#### 删除

`/user/delete`

参数名：`_id`

参数值：`Array`类型

可以同时删除多个，多个_id用分号拼接