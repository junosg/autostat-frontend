<template>
    <div>
        <!-- Descriptives -->
        <div class="text-2xl text-red-400 font-mono col-span-3">Descriptives</div>
        <div class="font-mono grid grid-cols-1 p-4 gap-y-4 w-full">
            <ElTable :data="Object.keys(result?.descriptives as object)">
                <ElTableColumn label="Group">
                    <template #default="scope">
                        {{ scope.row }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Mean">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].mean }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Max">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].max }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Min">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].min }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Variance">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].variance }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Skewness">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].skewness }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Kurtosis">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].kurtosis }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Count">
                    <template #default="scope">
                        {{ result?.descriptives[scope.row].observationCount }}
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>

        <!-- Assumptions -->
        <div class="text-2xl text-red-400 font-mono col-span-3">Assumptions</div>
        <div class="font-mono grid grid-cols-1 p-4 gap-y-4 w-full">
            <div class="text-1xl text-red-400 font-mono col-span-3">Equal Variance</div>
            <ElTable :data="[result?.assumptionsResults.equalVariance]">
                <ElTableColumn prop="testResults.test" label="Test"></ElTableColumn>
                <ElTableColumn prop="testResults.pvalue" label="P Value"></ElTableColumn>
                <ElTableColumn prop="testResults.statistic" label="Statistic"></ElTableColumn>
            </ElTable>
            <div class="text-1xl text-red-400 font-mono col-span-3">Normality</div>
            <ElTable :data="Object.keys(result?.assumptionsResults.normality.testResults as object)">
                <ElTableColumn label="Group">
                    <template #default="scope">
                        {{ scope.row }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Test">
                    <template #default="scope">
                        {{ result?.assumptionsResults.normality.testResults[scope.row].test }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="P Value">
                    <template #default="scope">
                        {{ result?.assumptionsResults.normality.testResults[scope.row].pvalue }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Statistic">
                    <template #default="scope">
                        {{ result?.assumptionsResults.normality.testResults[scope.row].statistic }}
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>

        <!-- Comparison -->
        <div class="text-2xl text-red-400 font-mono col-span-3">Comparison</div>
        <div class="font-mono grid grid-cols-1 p-4 gap-y-4 w-full">
            <ElTable :data="[result]">
                <ElTableColumn prop="test" label="Test"></ElTableColumn>
                <ElTableColumn prop="pvalue" label="P Value"></ElTableColumn>
                <ElTableColumn prop="pvalue" label="Statistic"></ElTableColumn>
            </ElTable>
            <div class="text-1xl text-red-400 font-mono col-span-3" v-if="result?.postHoc">Post Hoc ( {{ result.postHoc.test }} )</div>
            <ElTable :data="Object.keys(result?.postHoc?.result as object)" v-if="result?.postHoc">
                <ElTableColumn label="Comparison">
                    <template #default="scope">
                        {{ scope.row }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="P Value">
                    <template #default="scope">
                        {{ result?.postHoc?.result[scope.row].pvalue }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="Statistic">
                    <template #default="scope">
                        {{ result?.postHoc?.result[scope.row].statistic }}
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>
    </div>
</template>
<script setup lang="ts">
const result = useComparisonResult();
</script>