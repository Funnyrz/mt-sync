<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>连接</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="example-content">
                <ion-icon :icon="qrCode" style="font-size: 12rem;" @click="startScan"></ion-icon>
                <ion-button fill="clear" @click="startScan" style="font-size: 18px;font-weight: 800;">扫描二维码</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useBackButton } from "@ionic/vue";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonButton } from '@ionic/vue';
import { qrCode } from 'ionicons/icons';
import { io } from 'socket.io-client';
import { Clipboard } from '@capacitor/clipboard';
let socket;
export default {
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonButton },
    data() {
        return {
            scaning: false,
            qrCode
        }
    },
    mounted() {
        useBackButton(10, () => {
            if (this.scaning) {
                this.scaning = false;
                this.stopScan();
            }
        });
       
    },
    methods: {
        stopScan() {
            document.querySelector('body').classList.remove('qrscanner');
            BarcodeScanner.showBackground();
            BarcodeScanner.stopScan();
        },
        async startScan() {
            document.querySelector('body').classList.add('qrscanner');
            this.scaning = true
            await BarcodeScanner.checkPermission({ force: true });

            BarcodeScanner.hideBackground();

            const result = await BarcodeScanner.startScan();

            if (result.hasContent) {
                this.stopScan();
                this.scaning = false
                console.log();
                socket = io.connect('http://' + result.content, {
                    reconnectionDelayMax: 10000,
                    query: {
                        "device": "小米10U"
                    }
                })
            }
        },

    }
}
</script>

<style scoped>
.example-content {
    display: flex;
    align-items: center;
    height: 100%;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
}
</style>