<template>
  <div v-show="!isStartScan">
    <ion-button @click="startScan">扫描</ion-button>
  </div>
</template>

<script>
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useBackButton } from "@ionic/vue";

const startScan = async () => {
  // Check camera permission
  // This is just a simple example, check out the better checks below
  await BarcodeScanner.checkPermission({ force: true });

  // make background of WebView transparent
  // note: if you are using ionic this might not be enough, check below
  BarcodeScanner.hideBackground();

  const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

  // if the result has content
  if (result.hasContent) {
    console.log(result.content); // log the raw scanned content
  }
};
const stopScan = () => {
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
};
export default {
  data() {
    return {
      isStartScan: false,
    };
  },
  methods: {
    stopScan() {
      stopScan();
    },
    async startScan() {
      this.isStartScan = true;
      startScan();
    },
  },

  mounted() {
    useBackButton(10, () => {
      if (this.isStartScan) {
        this.isStartScan = false;
        stopScan();
      }
    });
  },
};
</script>

<style></style>
