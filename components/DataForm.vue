<template>
    <section class="grid gap-4 py-8">
        <DataUpload/>
        <div>
            <ElText size="large">Predictor Variable</ElText>
            <ElSelectV2 
                v-model="predictorVariable" 
                :options="predictorVariableOptions"
                @change="onPredictorChange"
                class="w-full"
            />
            <ElCheckbox
                v-model="predictorVariablePaired"
                size="large"
                :disabled="!canBePaired"
                >
                Paired
            </ElCheckbox>
        </div>
        <div>
            <ElText size="large">Outcome Variable</ElText>
            <ElSelectV2 
                v-model="outcomeVariable" 
                :options="outcomeVariableOptions"
                class="w-full"
            />
        </div>
        <ElButton type="primary" @click="analyze" :disabled="isLoading || (predictorVariable == null || outcomeVariable == null)">Analyze</ElButton>
        <ElCard class="box-card" v-loading="isLoading">
            <template #header>
                <div class="card-header grid grid-cols-6">
                    <div class="text-3xl text-red-400 font-mono col-span-3">Result</div>
                    <div class="col-span-2"></div>
                    <ElButton class="button justify-self-end col-span-1" text><Icon size="30px" name="material-symbols:content-copy-outline-rounded" @click="copyResult"></Icon></ElButton>
                </div>
            </template>
            
            <div v-if="error" class="text-1xl text-red-400 font-mono">
                {{ error }}
            </div>

            <div v-if="result">
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
                </div>
            </div>
        </ElCard>
    </section>
</template>
<script setup lang="ts">
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types';
import { AutoStatResult } from '../types/result'

const config = useRuntimeConfig()

const data = useComparisonData();
const result = useComparisonResult();

const predictorVariable = ref(null);
const predictorVariablePaired = ref(false);
const outcomeVariable = ref(null);
const error = ref(null as string|null);

const isLoading = ref(false)

//#region computed
const predictorVariableOptions = computed(() => {
    if (data.value.length <= 0) return [];

    var returnValue = Object.keys(data.value[0]).map((key) => {
        return {
            value: key,
            label: key
        }
    }) as OptionType[];

    return returnValue.filter((element) => checkIfCategorical(data.value, element.value));
});

const outcomeVariableOptions = computed(() => {
    if (data.value.length <= 0) return [];

    var returnValue = Object.keys(data.value[0]).map((key) => {
        return {
            value: key,
            label: key
        }
    }) as OptionType[];

    return returnValue.filter(element => predictorVariable.value != element.value).filter((element => checkIfNumeric(data.value, element.value)));
});

const canBePaired = computed(() => {
    if (data.value.length <= 0 || predictorVariable.value == null) return false;

    var distinctValues: string[] = [];

    data.value.forEach((element) => {
        if (distinctValues.includes(element[predictorVariable.value as keyof object])) return;

        distinctValues.push(element[predictorVariable.value as keyof object])
    });

    if (distinctValues.length != 2) return false;

    var distinctValueCountsInData: number[] = [];

    distinctValues.forEach((value, index) => {
        distinctValueCountsInData[index] = data.value.filter((element => element[predictorVariable.value as keyof object] == value)).length
    });

    return distinctValueCountsInData.every((count, index, array) => count === array[0]);
});
//#endregion computed

//#region watch
watch(data, (newData) => {
    predictorVariable.value = null;
    outcomeVariable.value = null;
    predictorVariablePaired.value = false;
    result.value = null
})
//#endregion watch

//#region methods
const analyze = async () => {
    isLoading.value = true;

    var payload = {
        predictor: predictorVariable.value,
        predictorPaired: predictorVariablePaired.value,
        outcome: outcomeVariable.value,
        data: data.value,
    }

    await useFetch(`${config.public.apiUrl}/test`, {
        method: 'post',
        body: payload
    }).then(response => {
        var autoStatResult: AutoStatResult = response.data.value as AutoStatResult

        result.value = autoStatResult;
        error.value = null;

        if (result.value) {
            error.value = null;
        } else {
            error.value ="Analysis failed. Please make sure that the data uploaded is following a vertical layout.";
        }
    }, err => {
    });

    isLoading.value = false;
}

const onPredictorChange = () => {
    if (outcomeVariable.value == predictorVariable.value)
        outcomeVariable.value = null;
}

const checkIfCategorical = (data: Array<object>, key: string) => {
    var returnValue = true

    data.every((element) => {
        if (typeof element[key as keyof object] != "string") {
            returnValue = false
        }
        
        return !returnValue
    });
    
    return returnValue
}

const checkIfNumeric = (data: Array<object>, key: string) => {
    var returnValue = true

    data.every((element) => {
        if (typeof element[key as keyof object] != "number") {
            returnValue = false
        }
        
        return !returnValue
    });
    
    return returnValue
}

const copyResult = () => {
    navigator.clipboard.writeText(`${JSON.stringify(result.value as object)}`)
}
//#endregion methods
</script>