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
        <ElCard class="box-card">
            <template #header>
                <div class="card-header grid grid-cols-6">
                    <div class="text-3xl text-red-400 font-mono col-span-3">Result</div>
                    <div class="col-span-2"></div>
                    <ElButton class="button justify-self-end col-span-1" text><Icon size="30px" name="material-symbols:content-copy-outline-rounded" @click="copyResult"></Icon></ElButton>
                </div>
            </template>
            <pre class="font-mono min-h-fit">{{ result }}</pre>
        </ElCard>
    </section>
</template>
<script setup lang="ts">
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types';
const config = useRuntimeConfig()

const data = useComparisonData();
const result = useComparisonResult();

const predictorVariable = ref(null);
const predictorVariablePaired = ref(false);
const outcomeVariable = ref(null);

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

    var resultObject: object = response.data.value as object

    result.value = resultObject;

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