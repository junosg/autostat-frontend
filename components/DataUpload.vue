<template>
    <section>
        <el-upload
            drag
            accept=".xls,.xlsx"
            :show-file-list="true"
            :limit="1"
            :on-success="onUploadSuccess"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    xls/xlsx files with a size less than 10mb
                </div>
            </template>
        </el-upload>
    </section>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadFile, UploadFiles } from 'element-plus';
import * as XLSX from 'xlsx';

const data = useComparisonData();

const onUploadSuccess = async (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
    await uploadFile.raw?.arrayBuffer().then((response) => {
        const workbook = XLSX.read(response);

        const content = workbook.SheetNames.map(name => ({ name, data: XLSX.utils.sheet_to_json(workbook.Sheets[name])}));
        data.value = content[0].data as object[];
    });
}

</script>