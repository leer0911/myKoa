## TypeORM

常用 [cli](https://typeorm.io/#/using-cli)

```bash
# 创建一个新实体
typeorm entity:create -n user

# 创建新的迁移
typeorm migration:create -n user

# 运行迁移
typeorm migration:run

# 回退迁移
typeorm migration:revert

```
