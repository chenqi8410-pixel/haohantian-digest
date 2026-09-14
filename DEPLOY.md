# 把日报 API 放到公网 HTTPS

本仓库的云环境没有 Fly / Railway / Render 账号，**无法在这里替你点上线**。按下面做完会得到一个 `https://…` 根地址，给每日机器人 `POST /api/digests`，以及以后小程序的 `request` 合法域名。

`POST /api/digests` 的字段、鉴权头、状态码都不变。样例就是 `examples/digest.sample.json`。

推荐主机：**Render**（免费 Web Service，自动 HTTPS）。Fly / Railway 步骤在文末。

## 0. 你需要准备的

- 一个 [Render](https://dashboard.render.com/) 账号（用 GitHub 登录，你提到的是 chenqi8410）
- **先有一个 GitHub 仓库**再选 Blueprint。这台环境不能替你创建 GitHub，步骤见 **[GITHUB.md](GITHUB.md)**
- 自己定一个生产 `PUBLISH_TOKEN`（不要用仓库默认的 `digest-bot-dev-key`）

## 1. Render 一键（推荐）

1. 打开 <https://dashboard.render.com/select-repo?type=blueprint>
2. 连接放了本仓库的 GitHub 仓库（根目录有 `render.yaml` + `Dockerfile`）
3. 确认 Blueprint 里服务名是 `haohantian-digest`，点击 Apply
4. 打开该 Web Service → Environment
   - `PUBLISH_TOKEN`：Render 会自动生成一串。**复制下来**给机器人用；或改成你指定的值后 Save
   - 已有 `TZ=Asia/Shanghai`、`NODE_ENV=production`
5. 等 Deploy 变 Live。Service 页顶部的地址形如：

   `https://haohantian-digest.onrender.com`

   这就是 API 根地址。没有路径后缀，也不要端口。

6. 自检（把主机名换成你的）：

```bash
curl -sS https://haohantian-digest.onrender.com/api/health
curl -sS https://haohantian-digest.onrender.com/api/digests/2026-09-14
```

第一条应有 `"ok":true`。第二条是种子日报（Google / OpenAI / Jane Street）。

免费实例会休眠，第一次请求可能要等 30–60 秒。磁盘是临时的：机器重启后若 `data/store.json` 没了，启动脚本会重新写入种子；**重启前用 POST 写进去的日子可能丢**。要留存就在 Render 给服务加一块 Disk，并把环境变量 `STORE_FILE` 设成盘上的路径，例如 `/var/data/store.json`。

没有 Blueprint 时：New → Web Service → 同一仓库 → Runtime 选 Docker → 实例 Root 填 `.` → 同样设置 `PUBLISH_TOKEN`、`TZ=Asia/Shanghai`。

## 2. 每日机器人（合同不变）

```bash
export DIGEST_API=https://haohantian-digest.onrender.com
export PUBLISH_TOKEN=你在 Render 里设的值

curl -sS -X POST "$DIGEST_API/api/digests" \
  -H 'Content-Type: application/json' \
  -H "X-Publish-Token: $PUBLISH_TOKEN" \
  -d @examples/digest.sample.json
```

也认 `X-API-Key` 或 `Authorization: Bearer …`。同一 `date` 再 POST 会整份覆盖。字段表见 README 第 6 节。

本机 cron 示例（每天北京时间 7:00，先自己生成当天 JSON）：

```cron
0 7 * * * DIGEST_API=https://你的主机 PUBLISH_TOKEN=… /path/to/scripts/publish-digest.sh /path/to/today.json
```

`scripts/publish-digest.sh` 已放在仓库里。

## 3. 以后给小程序用（DevTools 现在可以先不改）

1. 编辑 `miniprogram/config.js`，把 `apiBase` 改成上面的 HTTPS 根地址（不要末尾 `/`）。
2. 微信公众平台 → 开发管理 → 开发设置 → **request 合法域名**，只填主机名：`https://haohantian-digest.onrender.com`（换成你的）。
3. 真机预览前不要再勾「不校验合法域名」。

## 4. 备选：Fly.io

```bash
# 本机已安装 flyctl 并 fly auth login
fly launch --no-deploy --copy-config --name haohantian-digest
fly secrets set PUBLISH_TOKEN=你的token
fly deploy
fly apps open
```

健康检查走 `GET /api/health`。得到的 URL 一般是 `https://haohantian-digest.fly.dev`。

## 5. 备选：Railway

```bash
npm i -g @railway/cli
railway login
railway init
railway variables set PUBLISH_TOKEN=你的token TZ=Asia/Shanghai NODE_ENV=production
railway up
railway domain
```

`railway domain` 会打印 `https://….up.railway.app`。

## 6. 上线后把 URL 填回仓库（可选）

部署成功后把真实根地址记在这里，并改 `miniprogram/config.js`：

```
API 根地址：（部署后填写，例如 https://haohantian-digest.onrender.com）
```
