# 在 Windows Subsystem Linux(WSL) 安装所需的开发工具

> 说明：本教程只涵盖了在 WSL 中安装开发工具的过程。
> 你也可以把工具直接安装在操作系统中。

## 0. （可选）安装 Windows Terminal
在应用商店安装即可

## 1. 安装 WSL

按照[该教程](https://docs.microsoft.com/en-us/windows/wsl/install-win10)的步骤安装即可。在安装好之后你可能需要几分钟配置一下常用的工具（如 bash，更新源）以方便后续的开发，不过你不知道这些是什么的话，直接进行后续的步骤也完全没有问题。

## 2. 安装 Node.js + npm

如果你知道什么是 Node.js，那么想必你有一万种方法将它安装好。
在此遵循微软文档的推荐，使用 nvm 安装 Node.js。
你可以参考这一[链接](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)获得更详细的情况。
强烈建议先阅读这一教程，再执行后续操作。

具体而言，你需要依次执行这几个命令：

```
sudo apt update && sudo apt upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
nvm install node
nvm use node
```

在安装好工具之后，你可能需要重启所有的开发工具和终端，
以让环境变量生效。

## 3. 初始化仓库

进入仓库主目录，执行：

```
npm install
```

即可安装全部的依赖。仓库已被正确配置，
以保证提交的时候只包括我们写的代码，
这些依赖不会被提交到远程仓库。

## 4. 启动开发

进入仓库主目录，执行：

```
npm run dev
```

可以启动一个开发服务器，
在本地浏览器打开相应地址就可以查看目前的网页效果。
对文件修改保存后，刷新网页就可以生效。

## 5. 编译输出

> 注意：本项目的前端开发者大可不必关心这一步骤，
> 因为只有等待开发完成，实际部署到服务器时才需要这一步骤。

进入仓库主目录，执行：

```
npm run build
```

会在 dist/ 目录生成相应的输出。
