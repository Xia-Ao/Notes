### ng-file-upload教程

参考来源于：[木槿惜年2013《ng-file-upload教程》](http://www.jianshu.com/p/6e14f9200450)  
Github源码地址:[https://github.com/danialfarid/ng-file-upload](https://github.com/danialfarid/ng-file-upload)

一、ng-file-upload简介  
　　是一款轻量级、跨浏览器的angular上传文件指令  
二、特点  
　　（1）支持文件上传进度条、取消、暂停  
　　（2）支持文件拖放和黏贴图像  
　　（3）支持暂停和取消文件上传  
　　（4）支持验证文件的类型 / 大小、图像宽度 / 高度、视频 / 音频持续时间（ng-required）  
　　（5）支持预览显示选择的图像、视频、音频  
　　（6）支持CORS和直接上传文件的二进制数据\( Upload.$http\(\) \)  
　　.....  
三、用法  
　　示例：参考教程  
四、实例

```html
  <div class="form-group">
                            <label class="control-label col-md-2">
                                添加图片<span class="required">*</span>
                            </label>
                            <div class="col-md-7">
                                <div style="width: 200px;height: 200px;border: solid 1px #cfdbe2 ;vertical-align: middle; display: inline-block"
                                     data-toggle="modal" data-target="#imgPreview"  >
                                    <a href="javascript:void(0);" class="thumbnail">
                                        <img ngf-src="formData.businessLicenses || formData.default"
                                             style="width: 200px; max-height: 200px;">
                                    </a>
                                </div>
                                <span class="" style="display: inline-block ;vertical-align: middle;">
                                    <button type="file" class="btn btn-info"
                                            ngf-select="uploadFiles($file, $invalidFiles)" accept=".img,.jpg,.jpeg"
                                            ngf-max-size="1MB">选择图片</button>
                                    <button ng-if="formData.pic3" type="button" class="btn btn-info"
                                            ng-click="delPic()">删除图片</button>
                                </span>
                            </div>
                        </div>
```

```js
$scope.formData.businessLicenses='';
        $scope.formData.default='img/zhtc.png';
        $scope.formData.pic3='';
        //文件删除
        $scope.delPic = function(){
            $scope.formData.pic3 = "";
            $scope.formData.businessLicenses = "";
        };
        //文件上传
        $scope.uploadFiles = function (file, errFiles) {
            debugger;
            try {
                $scope.f = file;
                //运营公司-图片规则： 00+YYMMDDHHmmss+3+（1|2|3）
                var time = (new Date()).format("yyMMddhhmmss");
                var preff = file.name.slice(file.name.lastIndexOf("."));
                var prev = "00";
                var newName = prev + time + "3" + preff;
                Upload.rename(file, newName);
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: Setting.SERVER.UPLOAD,
                        data: {file: file}
                    });
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            // console.log(file.result);
                            // console.log(file);
                            $scope.formData.businessLicenses = Setting.SERVER.DOWNLOAD + "?file=" + newName;
                            console.log($scope.formData.businessLicenses, '-----', newName);
                            $scope.formData.pic3 = newName;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
            } catch (e) {
            }
        }
```

```js

```

六、文件拖拽上传  
还未试验成功，后面有时间再继续试验

