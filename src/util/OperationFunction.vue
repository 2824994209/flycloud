<template>
    <div class="fixed-more-icon" @click="toggleDropdown">
        <el-icon size="23px">
            <svg fill="none" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="toolbar-toggle hope-icon hope-c-XNyZK hope-c-PJLV hope-c-PJLV-ifkxHPo-css" height="1em" width="1em" style="overflow: visible;"><path fill="currentColor" d="M7 14a2 2 0 100-4 2 2 0 000 4zM14 12a2 2 0 11-4 0 2 2 0 014 0zM17 14a2 2 0 100-4 2 2 0 000 4z"></path><path fill="currentColor" fill-rule="evenodd" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-2 0c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" clip-rule="evenodd"></path></svg>
        </el-icon>
    </div>

    <div v-if="isDropdownVisible" class="custom-dropdown">
        <!-- 基础设置 -->
         <!-- <BasicSetting>
            <el-tooltip class="box-item" content="Basic setting 基础设置" placement="left">
                <div class="dropdown-item">
                    <el-icon size="23px">
                        <Setting />
                    </el-icon>
                </div>
            </el-tooltip>
         </BasicSetting> -->


        <!-- //上传文件 -->
        <UploadFile>
            <el-tooltip class="box-item" content="upload上传" placement="left">
                <div class="dropdown-item">
                    <el-icon size="23px">
                        <UploadFilled />
                    </el-icon>
                </div>
            </el-tooltip>
        </UploadFile>
        <!-- 创建文件 -->
        <CreateFile>
            <el-tooltip class="box-item" content="create file 创建文件" placement="left">
                <div class="dropdown-item">
                    <el-icon size="23px">
                        <DocumentAdd />
                    </el-icon>
                </div>
            </el-tooltip>
        </CreateFile>

        <!-- 创建文件夹 -->
        <CreateFolder>
            <el-tooltip class="box-item" content="create folder 创建文件夹" placement="left">
                <div class="dropdown-item">
                    <el-icon size="23px">
                        <FolderAdd />
                    </el-icon>
                </div>
            </el-tooltip>
        </CreateFolder>



    </div>
</template>
<script setup>
import { ref } from 'vue'
import UploadFile from './UploadFile.vue';
import CreateFile from './CreateFile.vue';
import CreateFolder from './CreateFolder.vue';

const isDropdownVisible = ref(false);

const toggleDropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value
}

</script>

<style scoped>
/* 假设选择框的类名是 .el-table-column--selection */
/* .el-table-column--selection {
  display: none;
} */

.fixed-more-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    cursor: pointer;
    width: 35px;
    /* 与下拉框宽度一致 */
    height: 35px;
    /* 与下拉框高度一致 */
    /* background: white;  */
    /* border: 1px solid #ccc;  */
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    /* 悬停效果 */
    border-radius: 5px;
    color: rgb(215, 164, 249);
}

.fixed-more-icon:hover {
    background: #b86ef9;
    border-radius: 5px;
}

.custom-dropdown {
    position: fixed;
    bottom: 55px;
    /* 调整位置使其与更多图标对齐 */
    right: 10px;
    /* background: white; */
    /* border: 1px solid #ccc; */
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);  */
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    width: 35px;
    /* 下拉框的宽度与图标一致 */
}

.dropdown-item {
    width: 35px;
    /* 正方形的宽度 */
    height: 35px;
    /* 正方形的高度 */
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    /* 悬停效果 */
    padding: 0;
    margin-bottom: 5px;
    color: rgb(215, 164, 249);
}

.dropdown-item:hover {
    background: #b86ef9;
}
</style>
