import { alertController } from '@ionic/vue';

export const ShowAlert = async (title: string, message: string, actionButtons: Array<string>) => {
    const alert = await alertController.create({
        header: title,
        message: message,
        buttons: actionButtons,
    });
    await alert.present();
};