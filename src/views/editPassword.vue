<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-icon slot="start" :icon="chevronBackOutline" class="back-button" @click="backSetting()"></ion-icon>
        <ion-title>Update Password</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Update Password</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="wrapper">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">current Password</ion-label>
              <ion-input placeholder="current Password" type="password" autocomplete="current-password" v-model="currentPassword"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">new Password</ion-label>
              <ion-input placeholder="new Password" type="password" autocomplete="new-password" v-model="newPassword"></ion-input>
            </ion-item>
          </ion-list>
        </div>

    
        <ion-button class="update" @click="updatePassword()">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
            Update
          </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon, loadingController, toastController, alertController } from '@ionic/vue';
import { logOutOutline, checkmarkOutline, chevronBackOutline } from 'ionicons/icons';

import firebase from 'firebase/app';
import 'firebase/auth';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon },
  setup() {
    return {
      logOutOutline,
      checkmarkOutline,
      chevronBackOutline,
      originalUserData: {},
      userData: {
        displayName: '',
        email: '',
      },
      currentPassword: '',
      newPassword: ''
    }
  },
  created() {
    (this as any).originalUserData = firebase.auth().currentUser;
    (this as any).userData.displayName = (this as any).originalUserData.displayName;
    (this as any).userData.email = (this as any).originalUserData.email;
  },
  methods: {
    async updatePassword() {
      const originalUserData = (this as any).originalUserData;
      const userData = (this as any).userData;
      const newPassword = (this as any).newPassword;
      const currentPassword = (this as any).currentPassword
      const credential = firebase.auth.EmailAuthProvider.credential(
        originalUserData.email,
        currentPassword
      )

      const loading = await loadingController
      .create({
        message: 'Please wait...',
        duration: 5000,
      });

      await loading.present();

      if(currentPassword===''&&newPassword===''){
        loading.dismiss();
        (this as any).presentAlert('Error','current password & new password No input.');
        return;
      }else if(currentPassword===''){
        loading.dismiss();
        (this as any).presentAlert('Error','current password No input.');
        return;
      }else if(newPassword===''){
        loading.dismiss();
        (this as any).presentAlert('Error','new password No input.');
        return;
      }

      if(!originalUserData) {
        loading.dismiss();
        (this as any).openToast('Failed!','danger');
        return;
      }
      
      originalUserData.reauthenticateWithCredential(credential).then(() => {
        // User re-authenticated.
        if(newPassword !== originalUserData.password) {
          originalUserData.updatePassword(newPassword).then(() => {
            loading.dismiss();
            (this as any).openToast('Updated!','success');
            (this as any).$router.push('/setting');
          }).catch((error: any) => {
            loading.dismiss();
            (this as any).openToast('Failed!','danger');
            console.error(error);
          });
        }else{
          loading.dismiss();
          (this as any).openToast('Nothing update!','warning');
        }
      }).catch((error: any) => {
        // An error happened.
        loading.dismiss();
        (this as any).openToast('Failed!','danger');
      });
    },
    backSetting() {
      (this as any).$router.push('/setting');
    },
    async openToast(text: string,status: string) {
      const toast = await toastController
        .create({
          message: text,
          color: status,
          duration: 2000,
          cssClass: 'tabs-bottom',
        })
      return toast.present();
    },
    async presentAlert(title: string, message: string) {
      const alert = await alertController
        .create({
          header: title,
          message: message,
          buttons: ['OK'],
        });
      return alert.present();
    },
  }
}
</script>

<style scoped>
.back-button{
  margin-left: 10px;
}

.wrapper{
  text-align: center;
}
.forms{
  margin: 20px 5%;
}
.update{
  margin-top: 30px;
}
.signout{
  margin-top: 100px;
}
</style>