<template>
  <a-upload
    v-model:fileList="fileList"
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <!-- todo -->
      <loading-outlined v-if="loading" />
      <plus-outlined v-else />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, reactive, toRefs } from "vue";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { message, Upload } from 'ant-design-vue';
import { FormItem } from "@/tyings/schema";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default defineComponent({
	name: "schema-form-input",
	emits: ["update:value"],
	components: {
		[Upload.name]: Upload,
	},
	props: {
		formItem: {
			// 表单项
			type: Object as PropType<FormItem>,
			default: () => ({}),
		},
		value: undefined as any, // 表单项值
	},
	setup(props, { attrs, emit }) {
		const fileList = computed({
			get: () => props.value,
			set: (val) => emit('update:value', val)
    });
    const state = reactive({
      loading: false,
      imageUrl: ''
    })
    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
        state.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          state.imageUrl = imageUrl;
          state.loading = false;
        });
      }
      if (info.file.status === 'error') {
        state.loading = false;
      }
    }
    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    }
		return {
      ...toRefs(state),
      fileList,
      handleChange,
      beforeUpload
		};
	},
});
</script>