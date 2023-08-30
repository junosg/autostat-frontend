import { AutoStatResult } from "types/result";

export const useComparisonResult = () => {
    return useState('comparisonResult', () => {return null as AutoStatResult|null});
}