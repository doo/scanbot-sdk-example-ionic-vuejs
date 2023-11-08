import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.scanbot.example.sdk.capacitor.ionic.vuejs',
  appName: 'scanbot-sdk-example-ionic-vuejs',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
