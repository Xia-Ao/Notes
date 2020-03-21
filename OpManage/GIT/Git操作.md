# Git

## 使用频率较高的操作

### 分支
* `git checkout master` 切换分支
* `git branch dev` 新建分支dev
* `git checkout -b dev` 新建dev分支并切换到dev
* `git merge dev` 在当前分支上将dev合并进来
* `git stash` 将当前工作现场“储藏”起来，等以后恢复现场后继续工作，存储之后status是干净的，可以切其他分支操作，操作完成之后再切回来，取回暂存
* `git stash list` 查看暂存区有哪些
* `git stash apply` 将暂存区内容回复到本地，但是暂存区内容不删除
* `git stash drop` 删除暂存区内容
* `git stash pop` 恢复并删除，相当于前面两步
* `git symbolic-ref --short -q HEAD` 获取当前分支名

* 分支开发策略

    ![](https://cdn.liaoxuefeng.com/cdn/files/attachments/001384909239390d355eb07d9d64305b6322aaf4edac1e3000/0)

* 合并冲突：在两个同时提交合并是，手动合并冲突。


### 版本回退
* `git reset --hard HEAD^`回退到上一个版本，几个`^`表示回退到往前第几个版本。
    * 使用`HEAD^`经常遇到提示More?的问题， 这是因为换行符`\n`的问题，可以使用 `HEAD~1`或者`HEAD~n`或者`git reset --hard "HEAD^"`
* `git reset --hard commitID的前几位` 回退到指定提交ID的那个版本
* 经常遇到以下场景，回退到上一个版本，又发现不好，想回到回退之前的版本，又忘了上一个commitID，使用`git reflog`查看上一个ID，再使用`git reset --hard commitID的前几位`

### 撤销修改
* `git checkout -- file`可以丢弃工作区的修改, 分两种情况
    * 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
    * 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。 
    * 
* `git reset HEAD <file>` 把暂存区的修改撤销掉（unstage），重新放回工作区

在使用撤销修改时，基本有以下三种场景：
* 场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
* 场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。
* 场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

`git checkout`不能对新增的文件进行撤销，这时候就该`git clean`上场了

#### 强大的 git clean 命令
`git clean`命令用来从你的工作目录中删除所有没有tracked过的文件

注意区分与`reset`之间的区别，
- `reset`命令影响的是被tracked的文件
- `clean`删除的没有被tracked的文件

先介绍一下命令参数
- `-n`: 是一次clean的演习, 告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒
- `-f`: 删除当前目录下所有没有track过的文件. 他不会删除`.gitignore`文件里面指定的文件, 不管这些文件有没有被track过
- `-d`: 删除当前目录下所有没有track过的文件夹. 他不会删除`.gitignore`文件里面指定的文件夹, 不管这些文件有没有被track过
- `-x`: 删除当前目录下所有没有track过的文件. 不管他是否是`.gitignore`文件里面指定的文件夹和文件


- 命令可以组合使用，经常用的命令为`git clean -ndf` 删除，没有使用track过的的文件和文件夹。
- 命令后可以直接更路径`<path>`
- 慎用`-x`， 因为他会把所有文件都删除，不会检查`.gitignore`文件


### 删除文件 
* `git rm file` 从版本库中删除文件
* 删除之后可以使用`git checkout --file`找回来


### 暂存


## 相似命令对比

### merge VS rebase
git merge

![](https://user-gold-cdn.xitu.io/2018/5/9/16342fbc3161f98e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 保留所有的commit记录，合并到master上，master上有开发分支所有的commit记录。
- 会有一条合并的commit记录

git rebase

![](https://user-gold-cdn.xitu.io/2018/5/9/16342fc20a6c6c8f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- rebase会合并commit记录，使commit变得干净。
- 冲突解决不一样，无需执行 git-commit，只要执行 continue
- 有一定危险性，尤其使多人开发同一个分支的时候，提交顺序不同，commit会被合并掉，其他人看不到。

## 环境

### git多平台换行符问题

window上配置如下

```
$ git config --global core.autocrlf input
$ git config --global core.safecrlf true
```



## 参考
- [git book](https://www.progit.cn/#_git_stashing)
- [廖雪峰Git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [git clean的用法](https://www.jianshu.com/p/0b05ef199749)