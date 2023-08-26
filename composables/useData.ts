export const useData = () => {
    return useState('data', () => [] as object[]);
}