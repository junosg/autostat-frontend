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
        <ElButton type="primary" @click="analyze">Analyze</ElButton>
    </section>
</template>
<script setup lang="ts">
import { OptionType } from 'element-plus/es/components/select-v2/src/select.types';

const data = useData();

const predictorVariable = ref();
const predictorVariablePaired = ref(false);
const outcomeVariable = ref(); 

//#region computed
const predictorVariableOptions = computed(() => {
    if (data.value.length <= 0) return [];

    var returnValue = Object.keys(data.value[0]).map((key) => {
        return {
            value: key,
            label: key
        }
    }) as OptionType[];

    return returnValue;
});

const outcomeVariableOptions = computed(() => {
    if (data.value.length <= 0) return [];

    var returnValue = Object.keys(data.value[0]).map((key) => {
        return {
            value: key,
            label: key
        }
    }) as OptionType[];

    return returnValue.filter(element => predictorVariable.value != element.value);
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
    var payload = {
        predictor: predictorVariable.value,
        predictorPaired: predictorVariablePaired.value,
        outcome: outcomeVariable.value,
        data: data.value,
    }

    const result = await useFetch("http://localhost:5000/test", {
        method: 'post',
        body: payload
    });

    console.log(result);
}

const onPredictorChange = () => {
    if (outcomeVariable.value == predictorVariable.value)
        outcomeVariable.value = null;
}
//#endregion methods
</script>