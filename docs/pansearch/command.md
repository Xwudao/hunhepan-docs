---
outline: deep
---

# 一些命令行工具

## reman的工具

如果，你想将ReMan版本的资源导入到PanSearch中，可以使用reman提供的命令行工具。

```bash
./reman send ps -h
将资源发送到 PanSearch

Usage:
   send ps [flags]

Flags:
  -a, --api string     api url
  -h, --help           help for ps
  -p, --page int       page (default 1)
  -t, --token string   token
```

帮助如上，参考命令：

```sh
./reman send ps -a https://example.com -t sys-token -p 1
```

这样就可以将 ReMan 的资源发送到 PanSearch 了。

> 注意：需要reman版本 `>1.7.10`
