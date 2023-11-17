export async function ErrorHandelingService<T>(callBack: Function) {
    try {
        const result: T = await callBack();
        return result;
    } catch (error) {
        console.log(JSON.stringify(error));
        return;
    } 
}