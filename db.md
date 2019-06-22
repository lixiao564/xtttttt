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

## Project

### 基本字段

- `projectName` 项目名称
- `type` 项目类型
- `level` 项目级别
    - `A` 两个审核人员必须选择
    - `B` 部门主管必须审核，部门领导可以不审
    - `C` 可以不选择审核人员
- `expectDate` 预计完成时间
- `describe` 项目描述
- `files` 项目附件
- `userName` 客户经理名称（只显示，不存project数据表）
- `userTel` 客户经理电话（只显示，不存project数据表）
- `customerName` 客户名称（只显示，不存project数据表）
- `customerType` 客户类型（只显示，不存project数据表）
- `dptManagerName` 部门主管姓名
- `dptManagerTel` 部门主管手机号
- `dptHeadName` 部门领导姓名
- `dptHeadTel` 部门领导手机号
- `restStep` 还剩下多少审核流程能完成

### 新增

`/project/add`

项目名称不能重复

### 列表

`/project/list`