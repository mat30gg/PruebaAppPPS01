/// <reference types="@capacitor/splash-screen" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.mateo.idiomas',
  webDir: 'www',
  appName: 'Tabla didactica de idiomas para niños',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#5b1c1c',
    }
  }
};

export default config;
