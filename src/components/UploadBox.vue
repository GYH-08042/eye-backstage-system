<script setup>
import { UploadFilled } from '@element-plus/icons-vue'

const token = localStorage.getItem('token')
const props = defineProps({
  modelValue: {//父级传过来的绑定的图片地址
    type: String
  }
})
const upload = ref()//上传组件实例
const fileList = reactive([])
props.modelValue ? fileList.push({ name: '上次图片', url: `http://192.168.1.3:28019${props.modelValue}` }) : ''//编辑场景下添加默认图片
const emit = defineEmits(['update:modelValue'])
//上传成功将获得的url传给父级的表单
const onSuccess = (res) => {
  console.log(res)
  emit('update:modelValue', res.data)
}
const clear = () => {//清空上传清单（供父级表单提交时清空表单所调用）
  upload.value.clearFiles()
}
defineExpose({//暴露给父级使用
  clear
})

//只能传一张图片，超出则覆盖
const onExceed = () => {
  ElMessage.error({ message: '仅支持单张图片！请删除重新上传' })
}
</script>

<template>
  <el-upload ref="upload" class="upload-demo" drag :limit="1" :file-list="fileList" show-file-list
    list-type="picture-card" action="/api/manage-api/v1/upload/file" :headers="{ token: token }" :on-success="onSuccess"
    :on-exceed="onExceed">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      将图片拖拽至此或者<em>点击此处上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        支持jpg/png格式,文件大小不超过500kb
      </div>
    </template>
  </el-upload>
</template>

<style>
.el-upload-dragger {
  padding: 0
}
</style>
