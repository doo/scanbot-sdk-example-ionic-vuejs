import { CheckRecognizerResult, CheckRecognizerResultField, HealthInsuranceCardScannerResult, MedicalCertificateScannerResult, MrzResult } from "capacitor-plugin-scanbot-sdk";

export class DataDetectorRepository {
    public static MrzResult: MrzResult;

    public static MedResult: MedicalCertificateScannerResult;

    public static EHICResult: { name: string; value: string; }[] = [];
    
    public static CheckResult: { name: string; value: string; }[] = [];

    /** Generate readable data from check results */
    public static GenerateCheckResult = (result: CheckRecognizerResult) => {
        const newFields: { name: string, value: string }[] = []
        Object.keys(result.fields).forEach((field) => {
            const checkField = (result.fields as any)[field] as CheckRecognizerResultField;
            const value = checkField.value?.text;
            if (value) {
                newFields.push({
                    name: field,
                    value: value
                })
            }
        })
        this.CheckResult = newFields;
    }

    /** Generate readable data from ehic results */
    public static GeneratEHICResult = (result: HealthInsuranceCardScannerResult) => {
        const newFields: { name: string, value: string }[] = []
        result.fields.map(item => {
            newFields.push({
                name: item.type,
                value: item.value
            });
        });
        DataDetectorRepository.EHICResult = newFields;
    }
}