---
outline: deep
---


# 程序相关说明

这里提供一些有关程序的说明 ，比如后台模板变量之类的。

## 后台模板变量

### 搜索页SEO变量

<!-- 
	var replaceMap = map[string]string{
		"%q%":               q,
		"%site_name%":       m.SiteName,
		"%site_title%":      m.Title,
		"%first_disk_name%": firstName,
		"%disk_names%":      strings.Join(strx.RemoveSimilarityTexts(diskNames, 0.7), ","),
	}
 -->

- `%q%`：搜索关键词
- `%site_name%`：网站名称
- `%site_title%`：网站标题
- `%first_disk_name%`：搜索结果中，第一个资源名称
- `%disk_names%`：搜索结果中，所有资源名称（已去重）

### 详情页SEO变量

<!-- 
	var replaceMap = map[string]string{
		"%site_name%":     m.SiteName,
		"%disk_name%":     doc.DiskName,
		"%site_title%":    m.Title,
		"%site_subtitle%": m.SubTitle,
		"%disk_type%":     godiskspider.GetDiskName(doc.DiskType),
		"%share_time%":    doc.SharedTime.Format(time.DateTime),
		"%files%":         strings.Join(strx.RemoveSimilarityText(doc.Files, 0.8), ", "),
	}
 -->

- `%site_name%`：网站名称
- `%disk_name%`：资源名称
- `%site_title%`：网站标题
- `%site_subtitle%`：网站副标题
- `%disk_type%`：资源类型
- `%share_time%`：分享时间
- `%files%`：文件列表名合集（已去重）

### TG SEO变量

<!-- 
	var replaceMap = map[string]string{
		"%site_name%":     m.SiteName,
		"%site_title%":    m.Title,
		"%site_subtitle%": m.SubTitle,
		"%title%":         tgdata.Title,
		"%text%":          strx.TruncateStr(strx.TrimLine(tgdata.Text), 150, "..."),
	}
 -->

- `%site_name%`：网站名称
- `%site_title%`：网站标题
- `%site_subtitle%`：网站副标题
- `%title%`：TG标题
- `%text%`：TG内容（截取150字）
