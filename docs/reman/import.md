---
outline: deep
---

# 导入资源说明

## 从文件导入网盘资源

该功能主要用来批量导入大量的网盘资源，其余小数量，可以通过网页后台导入

```sh
./go-reman import disk -h
import disk resource from excel / csv files

Usage:
   import disk [flags]

Flags:
  -f, --file string   file path to import
  -h, --help          help for disk
```

使用：

```sh
./go-reman import disk -f /path/to/file.csv/xlsx
```

**注意：**

文件格式必须是 `csv` 或者 `xlsx`，老版本的 `xls` 不支持。
