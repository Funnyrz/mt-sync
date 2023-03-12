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
import { App } from '@capacitor/app';
import { Toast } from '@capacitor/toast';
// import { Filesystem } from '@capacitor/filesystem';
// import { SendIntent } from "send-intent";
// SendIntent.checkSendIntentReceived().then((result) => {
//     if (result) {
//         console.log('SendIntent received');
//         console.log(JSON.stringify(result));
//     }
//     if (result.url) {
//         let resultUrl = decodeURIComponent(result.url);
//         console.log("文件地址:" + resultUrl);
//         Filesystem.readFile({ path: resultUrl })
//             .then((content) => {
//                 console.log(content.data);
//             })
//             .catch((err) => console.error(err));
//     }
// }).catch(err => console.error(err));
export default {
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonButton },
    data() {
        return {
            scaning: false,
            clipText: '',
            qrCode,
            socket: undefined,
            readClipTimer: undefined
        }
    },
    watch: {
        clipText: function (val) {
            if (this.socket) {
                this.socket.emit('serverMsg', val)
            } else {
                this.showToast('设备未连接!')
            }
        },
    },
    async mounted() {
        this.readClip()
        App.addListener('appStateChange', ({ isActive }) => {
            if (isActive) {
                if (!this.socket) {
                    this.showToast('设备未连接!')
                }
                this.readClip()
            } else {
                //程序后台运行了
            }
        });
        useBackButton(10, () => {
            if (this.scaning) {
                this.scaning = false;
                this.stopScan();
            }
        });
    },

    methods: {
        async showToast(msg) {
            await Toast.show({
                text: msg,
            });
        },
        readClip() {
            Clipboard.read().then((res) => {
                const value = res.value
                if (value && this.clipText !== value) {
                    this.clipText = value
                }
            })
        },
        listenClientMsg(socket) {
            //   接收服务端的消息
            socket.on('clientMsg', (data) => {
                console.log(data);
                Clipboard.write({
                    string: data
                })
            })
        },
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
                this.socket = io.connect('http://' + result.content, {
                    reconnectionDelayMax: 10000,
                    query: {
                        "device": "小米10U"
                    }
                })
                this.listenClientMsg(this.socket)
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