<template>
    <section class="grid gap-4">
        <div class="text-4xl text-red-400 font-mono">comparison</div>
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
                :disabled="predictorDistinctCount != 2"
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
        <ElButton type="primary" @click="analyze" :disabled="isLoading">Analyze</ElButton>
    </section>
</template>
<script setup lang="ts">
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types';
const config = useRuntimeConfig()

const data = useComparisonData();
const result = useComparisonResult();

const predictorVariable = ref();
const predictorVariablePaired = ref(false);
const outcomeVariable = ref(); 

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

const predictorDistinctCount = computed(() => {
    if (data.value.length <= 0 || predictorVariable.value == null) return 0;

    var distinctValues: string[] = [];

    data.value.forEach((element) => {
        if (distinctValues.includes(element[predictorVariable.value as keyof object])) return;

        distinctValues.push(element[predictorVariable.value as keyof object])
    });

    return distinctValues.length;
});
//#endregion computed

//#region methods
const analyze = async () => {
    isLoading.value = true;

    var payload = {
        predictor: predictorVariable.value,
        predictorPaired: predictorVariablePaired.value,
        outcome: outcomeVariable.value,
        data: data.value,
    }

    const response = await useFetch(`${config.public.apiUrl}/test`, {
        method: 'post',
        body: payload
    });

    result.value = response.data.value;
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
//#endregion methods
</script>