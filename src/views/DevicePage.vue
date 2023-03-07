<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>设备</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="example-content">设备</div>
        </ion-content>
    </ion-page>
</template>

<script>
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useBackButton } from "@ionic/vue";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';
export default {
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    data() {
        return {
            isStartScan: false,
        }
    },
    mounted() {
        useBackButton(10, () => {
            if (this.isStartScan) {
                this.isStartScan = false;
                this.stopScan();
            }
        });
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

            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan();

            if (result.hasContent) {
                console.log(result.content);
            }
        },
    }
}
</script>

<style scoped>
.example-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>