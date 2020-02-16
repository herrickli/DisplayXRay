## 安装nodejs
- http://nodejs.cn/download/ (建议直接Add to path)
## 切换阿里源
- $ npm config set registry https://registry.npm.taobao.org/
## 下载仓库并进入根目录$DIR_ROOT
## Prepare Data
- 把图片文件放入`data/Images/`中
- 把xml标注文件放入`data/Annotations/`中
- 目录结构如下
```
  $ROOT
  -data
  --get_data.py
  --Images
  ----1.jpg
  ----2.jpg
  ----...
  --Annotations
  ----1.xml
  ----2.xml
  ----...
```
- 运行 $ python data/get_data.py
## 运行脚本文件 
- $ sh prepare.sh 
- (如果未安装git或sh，打开prepare.sh文件依次输入命令)
## 使用
- 打开dist文件夹中的index.html