export const useComparisonData = () => {
    return useState('comparisonData', () => [] as object[]);
}