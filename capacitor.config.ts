/// <reference types="@capacitor/splash-screen" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.mateo.credito',
  appName: 'Carga de credito',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#5D7038',
    }
  }
};

export default config;
