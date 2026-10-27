# 字体来源与维护

本目录字体均采用 SIL Open Font License 1.1；许可原文随资源一并保留。字体为本地静态资源，访问页面不需要请求 Google Fonts。

| 资源 | 上游 | 范围 |
| --- | --- | --- |
| `noto-serif-sc.woff2` | [Noto Serif SC](https://github.com/google/fonts/tree/main/ofl/notoserifsc)，经 Google Fonts CSS2 服务提供 | normal，400–700 可变字重；页面所需中文与标点子集 |
| `cormorant-garamond.woff2` | [Cormorant Garamond](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond)，经 Google Fonts CSS2 服务提供 | normal，300–700 可变字重；Latin 子集 |
| `cormorant-garamond-italic.woff2` | 同上 | italic，300–700 可变字重；Latin 子集 |

## 更新中文字符

从 `项目文案库.md`、`index.html`、`styles.css` 与 `script.js` 合并提取非 ASCII 字符、去重排序，以 `text` 参数请求 `https://fonts.googleapis.com/css2`。`family` 参数为 `Noto Serif SC:wght@400..700`，`display` 为 `swap`；请求使用支持 WOFF2 的现代 Chrome User-Agent。下载 CSS 中 `src` 指向的字体覆盖本目录对应文件。页面若引入新文字，应重复该步骤；缺字时 CSS 的系统字体回退保证可读性，但会改变字形观感。

英文资源采用 CSS2 的 `Cormorant Garamond:ital,wght@0,400..700;1,400..700` 返回值中 `latin` 分组，返回字体实际支持 300–700；常规和斜体各保留一个 WOFF2。新增西里尔文、越南语或扩展拉丁字符时需扩充相应子集。

## 已验证覆盖

2026-10-27：中文子集依据四个素材及页面文件请求 532 个非 ASCII 字符，文件 191,600 字节。FontTools 验证全部中文与中文标点存在；装饰符号 `⌁` 不在上游字库中，交由页面系统字体回退。两个英文文件均覆盖全部可打印 ASCII 字符，分别为 37,776 与 39,304 字节。三份字体均为有效 WOFF2 可变字体。

许可上游分别为 [Noto Serif SC OFL](https://github.com/google/fonts/blob/main/ofl/notoserifsc/OFL.txt) 与 [Cormorant Garamond OFL](https://github.com/google/fonts/blob/main/ofl/cormorantgaramond/OFL.txt)。
