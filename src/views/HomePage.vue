<template>
  <nut-tabbar @tab-switch="tabSwitch">
    <nut-tabbar-item tab-title="标签">
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.unactive" alt="" />
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="标签">
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.unactive" alt="" />
      </template>
    </nut-tabbar-item>
    <nut-tabbar-item tab-title="标签">
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.unactive" alt="" />
      </template>
    </nut-tabbar-item>
  </nut-tabbar>

</template>

<script>
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useBackButton } from "@ionic/vue";
export default {
  data() {
    return {
      isStartScan: false,
    };
  },
  methods: {
    stopScan() {
      document.querySelector('body').classList.remove('scanner-active');
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
    },
    async startScan() {
      document.querySelector('body').classList.add('scanner-active');
      this.isStartScan = true;
      await BarcodeScanner.checkPermission({ force: true });

      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
    },
  },

  mounted() {
    useBackButton(10, () => {
      if (this.isStartScan) {
        this.isStartScan = false;
        this.stopScan();
      }
    });
  },
};
</script>

<style></style>
