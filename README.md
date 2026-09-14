# 浩瀚长天

美国与全球招聘的每日速报。微信小程序对外名称是 **浩瀚长天**（AppID `wx9884b9405d1a2e1c`），内容品牌仍用「美聘日报」。后端 API 给日报机器人写入。公众号推送本轮不做，避免挡住小程序上线。

今日种子日期：**2026-09-14**，三家样例公司：**Google / OpenAI / Jane Street**。接口挂了或开发者工具没连上网时，小程序会读本地同一份种子，保证能演示列表、详情、往期。

## 仓库结构

```
miniprogram/          原生微信小程序（今日 / 详情 / 往期 / 我的）
server/               Express API
miniprogram/data/offline.js   离线种子（与服务端 2026-09-14 一致）
examples/digest.sample.json   机器人 POST 示例
```

## 1. 跑后端 API

需要 Node.js 20+。

```bash
cp .env.example .env   # 可改 PUBLISH_TOKEN
npm install
npm start              # 默认 http://127.0.0.1:43187
```

本地自检：

```bash
curl -s http://127.0.0.1:43187/api/health
curl -s http://127.0.0.1:43187/api/digests
curl -s http://127.0.0.1:43187/api/digests/2026-09-14
npm test
```

公网 HTTPS 见 **[DEPLOY.md](DEPLOY.md)**。Render 必须先有 GitHub 仓库，这台环境不能代推，步骤见 **[GITHUB.md](GITHUB.md)**。部署后把 `miniprogram/config.js` 的 `apiBase` 改成该根地址（不要带末尾斜杠）。

## 2. 用微信开发者工具打开小程序

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 选「导入项目」，目录选**本仓库根目录**（`project.config.json` 在根上，`miniprogramRoot` 指向 `miniprogram/`）。
3. **AppID** 已写入 `project.config.json`：`wx9884b9405d1a2e1c`（小程序名称：浩瀚长天）。导入时用这个正式号，不要再用游客 `touristappid`。

4. 详情 → 本地设置 → 勾选 **不校验合法域名、web-view（业务域名）、TLS version 以及 HTTPS 证书**（只在连 `http://127.0.0.1:43187` 时需要）。
5. 编译后应看到 2026-09-14 三家公司。即便 API 没开，页顶会提示「离线种子」。

改接口地址：编辑 `miniprogram/config.js`

```js
module.exports = {
  apiBase: "https://haohantian-digest.onrender.com",
};
```

## 3. 上线前：配置 request 合法域名

真机预览 / 正式版不能走 localhost，也不能关校验。

1. 小程序后台 → 开发管理 → 开发设置 → **服务器域名**。
2. **request 合法域名**填你的 API 主机名，必须：
   - `https://`
   - 备案（国内主体）
   - 有效证书
   - 不要端口号、不要路径
3. 例：`https://haohantian-digest.onrender.com`，对应 `apiBase: "https://haohantian-digest.onrender.com"`。
4. 保存后重新预览。域名每月修改次数有限。

其余还要人在控制台做的事（本仓库无法代做）：

- 用已登记的 AppID `wx9884b9405d1a2e1c` 登录开发者工具（仓库里已写好）。
- 配置合法域名、上传代码、提交审核、发布。
- （可选、本轮未做）订阅消息模板、小程序码、公众号关联与群发。

## 4. 页面

| 页面 | 路径 | 作用 |
| --- | --- | --- |
| 今日列表 | `pages/today/today` | 当天日报标题 + 职位列表，可搜可筛 |
| 日报详情 | `pages/digest/digest` | 三点观察 + 市场说明 + 职位 |
| 职位详情 | `pages/job/job` | 描述、要求、收藏、复制申请链接 |
| 往期历史 | `pages/history/history` | 按日期进旧日报 |
| 我的 | `pages/about/about` | 接口地址、本机收藏 |

## 5. HTTP API

成功：`{ "ok": true, "data": ... }`  
失败：`{ "ok": false, "error": "中文原因" }`

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/api/health` | 服务存活 |
| GET | `/api/digests` | 日报列表（不含职位正文） |
| GET | `/api/digests/:date` | 某一天完整日报，日期 `YYYY-MM-DD` |
| GET | `/api/today` | 上海时区「今天」；没有则退回最近一天 |
| GET | `/api/jobs` | 可选 `date` `category` `visa` `q` `workMode` |
| GET | `/api/jobs/:id` | 单条职位 |
| POST | `/api/digests` | 机器人发布 / 按日期覆盖，需 `PUBLISH_TOKEN` |

`GET /api/oa/:date` 只是公众号正文草稿，**不会向公众号推送**。

## 6. `POST /api/digests` 鉴权、字段、curl

环境变量 `PUBLISH_TOKEN`（默认开发值 `digest-bot-dev-key`）。请求头任选其一：

- `X-Publish-Token: <token>`
- `X-API-Key: <token>`
- `Authorization: Bearer <token>`

同一 `date` 再 POST 会整份覆盖。

### 请求 JSON

```json
{
  "date": "2026-09-15",
  "title": "日报标题，必填",
  "summary": "列表页摘要",
  "weekdayZh": "星期二",
  "highlights": ["要点一", "要点二"],
  "marketNote": "市场观察正文",
  "coverLabel": "09 / 15",
  "publishedAt": "2026-09-15T07:00:00+08:00",
  "jobs": [
    {
      "id": "j-20260915-01",
      "title": "职位名，必填",
      "company": "公司名，必填",
      "logo": "Go",
      "location": "Mountain View, CA",
      "locationZh": "加州 · 山景城",
      "workMode": "hybrid",
      "workModeZh": "混合办公",
      "category": "software",
      "categoryZh": "软件工程",
      "visa": ["H-1B", "STEM OPT"],
      "salaryMin": 180000,
      "salaryMax": 260000,
      "currency": "USD",
      "level": "L5 / Senior",
      "tags": ["Backend", "Go"],
      "headline": "列表上一句话",
      "description": "详情页正文",
      "requirements": ["要求一", "要求二"],
      "applyUrl": "https://careers.google.com/",
      "source": "Google Careers",
      "isHighlight": true
    }
  ]
}
```

字段约定：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `date` | 是 | `YYYY-MM-DD` |
| `title` | 是 | 日报标题 |
| `jobs` | 否 | 数组，缺省当空列表 |
| `jobs[].title` | 是 | 职位名 |
| `jobs[].company` | 是 | 公司名 |
| `jobs[].id` | 否 | 不传则生成 `j-YYYYMMDD-01` |
| `jobs[].workMode` | 否 | `remote` \| `hybrid` \| `onsite` |
| `jobs[].visa` | 否 | 字符串数组 |
| 其余文案 / 薪资 / 链接 | 否 | 缺省为空或 0 |

完整样例见 `examples/digest.sample.json`。

### curl

```bash
curl -sS -X POST http://127.0.0.1:43187/api/digests \
  -H 'Content-Type: application/json' \
  -H 'X-Publish-Token: digest-bot-dev-key' \
  -d @examples/digest.sample.json
```

生产把 URL 换成 DEPLOY.md 里的 HTTPS 根地址，把 token 换成服务器上的 `PUBLISH_TOKEN`。完整生产字段见 `examples/digest.sample.json`。

## 7. 本轮没做（不挡小程序）

- 公众号自动群发 / 草稿箱同步
- 小程序码生成接口
- 订阅消息页与模板申请

这些等小程序在开发者工具里跑通、域名和 AppID 齐了再补。
