import { CheckRecognizerResult, CheckRecognizerResultField, MrzResult } from "capacitor-plugin-scanbot-sdk";

export class DataDetectorRepository {
    public static DataResult: string = '';

    public static EHICResult: { name: string; value: string; }[] = [];
    public static CheckResult: { name: string; value: string; }[] = [];

    public static parseResult = (result: CheckRecognizerResult) => {
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
}