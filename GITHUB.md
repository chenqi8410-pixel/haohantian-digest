# 把代码放到 GitHub（Render 选仓库用）

这台云环境**没有 GitHub 登录**（`gh` 未授权，也没有 `GH_TOKEN`），所以**没有** `https://github.com/owner/name` 可以给你。`main` 已含 `render.yaml` / `Dockerfile`，API 合同未改。

Render 只能从 **GitHub** 选仓库。请用你登录 Render 的那个 GitHub 账号（你提到的是 chenqi8410）做下面任一步。

## 方法 A（最快）：网页新建空仓库 + 上传 zip

1. 打开 <https://github.com/new>，已登录要给 Render 用的账号。
2. Repository name 填 `haohantian-digest`（可改）。
3. Public 即可（Private 也行，之后在 Render 授权该账号）。
4. **不要**勾选 Add README / .gitignore / license，点 Create repository。
5. 仓库页 → Add file → Upload files。
6. 把本仓库附带的 **`haohantian-digest-github.zip`**（或你从本项目打的同样 zip）拖进去。zip 里必须能看到根目录的 `render.yaml`、`Dockerfile`、`package.json`。
7. Commit。完成后地址是：

   `https://github.com/<你的用户名>/haohantian-digest`

8. 回到 Render → Blueprint / New Web Service → 选这个仓库。

若代理界面提供了 zip 下载，用那份；否则在项目根目录自己打：

```bash
git archive --format=zip --output=haohantian-digest-github.zip HEAD
```

不要把 `node_modules/` 传上去。

## 方法 B：本机 git 推 main

仓库必须是**空的**（不要先点 GitHub 的 Create README）。

```bash
# 在已有本项目的目录（当前就是 main）
git remote add github https://github.com/<你的用户名>/haohantian-digest.git
git push -u github main
```

或用仓库里的脚本：

```bash
./scripts/push-to-github.sh <你的用户名>/haohantian-digest
```

## 方法 C：Cursor 里的 Create repo

若这个云项目界面上有 **Create repo**，点它。  
- 若生成的是 `https://github.com/...`，把完整 URL 拿去给 Render 选即可。  
- 若只生成 Origin 地址、没有 github.com，仍须走方法 A 或 B。

## 不要做的

- 不要改 `POST /api/digests` 字段或鉴权。
- 不要在仓库里提交 AppSecret / 生产 `PUBLISH_TOKEN`。
- 不要指望这台 VM 替你 `gh repo create`。
