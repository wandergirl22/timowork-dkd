<template>
  <div>
    <el-button class="color" type="primary" icon="el-icon-circle-plus-outline" size="small" @click="AddType">
      新建
    </el-button>
    <el-dialog :title="Title" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="型号名称" prop="name">
          <el-input maxlength="10" v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="型号编码" prop="model">
          <el-input maxlength="15" v-model="form.model" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="货道行数" prop="vmRow">
          <el-input-number
            v-model="form.vmRow"
            controls-position="right"
            @change="handleChange"
            :min="0"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道列数" prop="vmCol">
          <el-input-number
            v-model="form.vmCol"
            controls-position="right"
            @change="handleChange"
            :min="0"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="货道容量" prop="channelMaxCapacity">
          <el-input-number
            controls-position="right"
            v-model="form.channelMaxCapacity"
            @change="handleChange"
            placeholder="请输入"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="设备图片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { setVmDeviceApi, setVmTypeApi } from '@/api/device'
export default {
  data() {
    return {
      Title: '新增设备类型',
      deviceType: {},
      dialogVisible: false,
      imageUrl: '',
      baseUrl: '',
      form: {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        model: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmRow: [{ required: true, message: '请输入', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入', trigger: 'blur' }],
        image: [{ required: true, message: '请输入', trigger: 'blur' }],
        channelMaxCapacity: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.handleClose()
  },
  methods: {
    isShowData() {
      console.log(this.deviceType)
      this.Title = '修改设备类型'
      this.form.name = this.deviceType.name
      this.form.model = this.deviceType.model
      this.form.vmRow = this.deviceType.vmRow
      this.form.vmCol = this.deviceType.vmCol
      this.form.channelMaxCapacity = this.deviceType.channelMaxCapacity
      this.imageUrl = this.deviceType.image
    },
    handleClose() {
      this.dialogVisible = false
      this.deviceType = {}
      this.form = {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      }
      this.imageUrl = ''
      // console.log(this.deviceType)
    },
    cancel() {
      this.dialogVisible = false
      this.deviceType = {}
      this.form = {
        name: '',
        model: '',
        vmRow: undefined,
        vmCol: undefined,
        channelMaxCapacity: undefined,
        image: ''
      }
      this.imageUrl = ''
    },
    AddType() {
      if (JSON.stringify(this.deviceType) === '{}') {
        this.dialogVisible = true
        this.Title = '新增设备类型'
      }
    },
    async onSubmit() {
      await this.$refs.form.validate()
      try {
        if (JSON.stringify(this.deviceType) === '{}') {
          this.form.image = this.imageUrl
          const res = await setVmDeviceApi(this.form)
          this.$emit('getvmType')
          this.dialogVisible = false
          console.log(res)
          console.log(11)
        } else {
          // 修改
          console.log(this.deviceType)
          this.form.image = this.imageUrl
          const res = await setVmTypeApi(this.deviceType.typeId, this.form)
          console.log(res)
          this.$emit('getvmType')
          console.log(this.deviceType)
          this.dialogVisible = false
          console.log(22)
        }
      } catch (error) {
        this.$message.error('该售货机类型正在使用')
      }
    },
    handleChange(value) {
      console.log(value)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 0.2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 84px;
  height: 84px;
  line-height: 178px;
  text-align: center;
  border: 1px solid;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.color {
  background-color: #ff702b;
  border: none;
  margin-bottom: 20px;
  width: 80px;
  height: 36px;
}
.GD {
  background-color: #f8f4f0;
  border: unset;
  color: black;
  width: 80px;
  height: 36px;
}

.el-input-number {
  width: 100%;
}
/deep/.el-dialog {
  border-radius: 10px !important;
}
/deep/.el-dialog__body {
  padding: 0 50px;
}
.el-icon-plus {
  &::before {
    position: absolute;
    bottom: -35px;
    left: 30px;
  }
}
</style>
