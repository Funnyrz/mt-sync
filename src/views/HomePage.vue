<template>
  <ion-page class="scanner-hide">
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="connect" href="/connect">
          <ion-icon :icon="qrCode" />
          <ion-label>连接</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="device" href="/device">
          <ion-icon :icon="desktop" />
          <ion-label>设备</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="setting" href="/setting">
          <ion-icon :icon="settings" />
          <ion-label>设置</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
import { qrCode, desktop, settings } from 'ionicons/icons';
export default {
  components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
  data() {
    return {
      qrCode,
      desktop,
      settings
    };
  },
  methods: {

  },

  mounted() {

  },
};
</script>

<style></style>
