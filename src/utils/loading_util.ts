import { loadingController } from "@ionic/vue";

export const showLoading = async () => {
    (
        await loadingController.create({
            message: 'Loading...',
        })
    ).present();
};

export const dismissLoading = async () => {
    await loadingController.dismiss();
}