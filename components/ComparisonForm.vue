<template>
    <section class="grid gap-4 py-8">
        <ComparisonUpload/>
        <div>
            <ElText size="large">
                <ClientOnly>
                    <ElTooltip
                        :content="predictorVariableTooltip"
                        effect="dark"
                        placement="top-start"
                        >
                        Predictor Variable
                    </ElTooltip>
                </ClientOnly>
            </ElText>
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
            
            <ElText size="large">
                <ClientOnly>
                    <ElTooltip
                        :content="outcomeVariableTooltip"
                        effect="dark"
                        placement="top-start"
                        >
                        Outcome Variable
                    </ElTooltip>
                </ClientOnly>
            </ElText>
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
                    <ElButton class="button justify-self-end col-span-1" text v-if="result"><Icon size="30px" name="material-symbols:content-copy-outline-rounded" @click="copyResult"></Icon></ElButton>
                </div>
            </template>
            
            <div v-if="error" class="text-1xl text-red-400 font-mono">
                {{ error }}
            </div>
            <ComparisonResult v-if="result"></ComparisonResult>
        </ElCard>
    </section>
</template>
<script setup lang="ts">
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types';
import { AutoStatResult } from '../types/result'

const config = useAppConfig()

const data = useComparisonData();
const result = useComparisonResult();

const predictorVariable = ref(null);
const predictorVariablePaired = ref(false);
const predictorVariableTooltip = ref("Predictor variables, also known as independent variables, are the variables in a statistical or predictive model that are used to explain or predict the variability in the dependent variable.");
const outcomeVariable = ref(null);
const outcomeVariableTooltip = ref("Outcome variables, also known as dependent variables, are the variables in a statistical analysis or predictive model that represent the results or outcomes being studied or predicted.");
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

    await useFetch(`${config.apiUrl}/test`, {
        method: 'post',
        body: payload,
        headers: {
            auth: config.apiKey
        }
    }).then(response => {
        var autoStatResult: AutoStatResult = response.data.value as AutoStatResult
        var autoStatError = response.error.value as object;

        result.value = autoStatResult;
        error.value = null;

        if (result.value) {
            error.value = null;
        }

        if (autoStatError) {
            type ErrorKey = keyof typeof autoStatError;
            error.value = autoStatError["data" as ErrorKey]['message'] as string;
        }
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