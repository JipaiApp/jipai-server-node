# Jipai server in NodeJS

这是基于 Pili Streaming Cloud 实现的一个轻量级业务后台, 配合 [Jipai App](https://github.com/jipaiapp/jipai-app-ios) 使用。

## 调用流程

![](./workflow.png)

## 功能

- [x] 创建直播 stream
- [x] 获取 stream
- [x] 获取 stream 的直播地址

## 核心中间件

- [pili](https://github.com/pili-engineering) 实现整体直播逻辑
- [koa](http://koajs.com) 实现 App 逻辑

## 需要

- `node` 版本为 0.11.12 以上开启 `--harmony` 或者直接使用 4.0, 亦或使用 `iojs`
- 有七牛账号, 并开通了直播权限 (如没有开通，可以通过[这里](mailto:pili@qiniu.com)发邮件申请)

## 配置及运行

### 配置

将 `config.js` 中的

```javascript
qiniu: {
    ak: 'QiniuAK',
    sk: 'QiniuSK',
    hub: 'PiliHubName'
}
```

替换为你自己七牛账号的 `Ak`, `SK`, 并将 `hub` 替换为你在 Pili 后台创建的 `hub` 对应的 `hub name`.

### 运行

```bash
$ node app.js
```

现在你在本地就运行了一个可以快速提供直播服务的 server.
