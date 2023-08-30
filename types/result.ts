interface TestResult {
    pvalue: number,
    statistic: number,
    test: string
}

interface EqualVarianceTestResult extends TestResult {
    areVariancesEqual: boolean
}

interface EqualVarianceResult {
    passed: boolean,
    testResults: EqualVarianceTestResult
}

interface NormalityTestResult extends TestResult {
    isNormal: boolean
}

interface NormalityResult {
    passed: boolean,
    testResults: Record<string, NormalityTestResult>
}

interface DescriptiveTestResult {
    kurtosis: number,
    max: number,
    mean: number,
    min: number,
    observationCount: number,
    outcome: string,
    predictor: string,
    skewness: string,
    variance: string
}

export interface AutoStatResult extends TestResult {
    assumptionsResults: {
        equalVariance: EqualVarianceResult,
        normality: NormalityResult,
    },
    descriptives: Record<string, DescriptiveTestResult>,
}

