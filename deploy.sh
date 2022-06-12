
###
 # @Author: vuvivian
 # @Description: 请输入....
 # @Date: 2022-06-11 23:42:36
 # @LastEditors: Do not edit
 # @LastEditTime: 2022-06-12 00:01:11
 # @FilePath: /Girl-Blog/deploy.sh
### 

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# # 如果发布到 https://<USERNAME>.github.io/<REPO>
# https://github.com/vuvivian/Girl-Blog
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@github.com:vuvivian/Girl-Blog.git master:gh-pages

cd -