<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-icon slot="start" :icon="chevronBackOutline" class="back-button" @click="backSetting()"></ion-icon>
        <ion-title>Update Email</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Update Email</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="wrapper">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">email</ion-label>
              <ion-input placeholder="email" type="email" v-model="userData.email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">password</ion-label>
              <ion-input placeholder="password" type="password" v-model="password"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button class="update" @click="updateEmail()">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
            Update
          </ion-button>
        </div>
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
        email: ''
      },
      password: ''
    }
  },
  created() {
    (this as any).originalUserData = firebase.auth().currentUser;
    (this as any).userData.displayName = (this as any).originalUserData.displayName;
    (this as any).userData.email = (this as any).originalUserData.email;
  },
  methods: {
    async updateEmail() {
      const originalUserData = (this as any).originalUserData;
      const userData = (this as any).userData;
      const credential = firebase.auth.EmailAuthProvider.credential(
        originalUserData.email,
        (this as any).password
      )

      const loading = await loadingController
      .create({
        message: 'Please wait...',
        duration: 5000,
      });

      await loading.present();

      if(userData.email===''&&(this as any).password===''){
        loading.dismiss();
        (this as any).presentAlert('Error','email & password No input.');
        return;
      }else if(userData.email===''){
        loading.dismiss();
        (this as any).presentAlert('Error','email No input.');
        return;
      }else if((this as any).password===''){
        loading.dismiss();
        (this as any).presentAlert('Error','password No input.');
        return;
      }

      if(!originalUserData) {
        loading.dismiss();
        (this as any).openToast('Failed!','danger');
        return;
      }


      // update email
      // **in progress!**

      originalUserData.reauthenticateWithCredential(credential).then(() => {
        // User re-authenticated.
        console.log('success')
        if(userData.email !== originalUserData.email) {
          originalUserData.updateEmail(userData.email).then(() => {
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
        console.log(error)
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
          duration: 2000
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