---
outline: deep
---

# 一些命令帮助

## 删除指定分享用户的资源

> 预计在 `v0.3.3` 版本中发布

> 说明：如果开放了游客提交功能，那么有些人可能会提交 `引流` 的资源，这些资源是不允许的，所以，我们需要删除这些资源

```sh
./reman rm user -u "<share-user>"
```


## 从文件导入网盘资源

该功能主要用来批量导入大量的网盘资源，其余小数量，可以通过网页后台导入

```sh
./reman import disk -h
import disk resource from excel / csv files

Usage:
   import disk [flags]

Flags:
  -f, --file string   file path to import
  -h, --help          help for disk
```

使用：

```sh
./reman import disk -f /path/to/file.csv/xlsx
```

**注意：**

1. 文件格式必须是 `csv` 或者 `xlsx`，老版本的 `xls` 不支持。
2. 确保命令是在 `reman` 所有目录下执行的，也最好 csv/xlsx 文件也在该目录。
