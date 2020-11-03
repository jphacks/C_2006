<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
          <ion-icon slot="start" :icon="chevronBackOutline" class="back-button" @click="backSetting()"></ion-icon>
        <ion-title>Update Name</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Update Name</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="wrapper">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">name</ion-label>
              <ion-input placeholder="name" type="text" v-model="userData.displayName"></ion-input>
            </ion-item>
          </ion-list>
        </div>

    
        <ion-button class="update" @click="updateName()">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
            Update
          </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon, loadingController, toastController } from '@ionic/vue';
import { logOutOutline, checkmarkOutline, chevronBackOutline } from 'ionicons/icons';
import firebase from 'firebase';

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
    }
  },
  data() {
    return {
    }
  },
  created() {
    (this as any).originalUserData = firebase.auth().currentUser;
    (this as any).userData.displayName = (this as any).originalUserData.displayName;
    (this as any).userData.email = (this as any).originalUserData.email;
  },
  methods: {
    async updateName() {
      const originalUserData = (this as any).originalUserData;
      const userData = (this as any).userData;

      const loading = await loadingController
      .create({
        message: 'Please wait...',
        duration: 5000,
      });

      await loading.present();

      if(!originalUserData) {
        return;
      }
      // update displayName
      if(userData.displayName !== originalUserData.displayName) {
        originalUserData.updateProfile({
          displayName: userData.displayName,
        }).then(() => {
          loading.dismiss();
          (this as any).openToast();
          (this as any).$router.push('/setting');
        }).catch((error: any) => {
          console.error(error);
        });
      }
    },
    backSetting() {
      (this as any).$router.push('/setting');
    },
    async openToast() {
      const toast = await toastController
        .create({
          message: 'Success',
          color: 'success',
          duration: 2000
        })
      return toast.present();
    }
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