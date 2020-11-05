<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Setting</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Setting</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="wrapper">
        <div class="forms">
          <ion-list>
            <ion-item @click="toEditName()">
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
              <ion-label>name</ion-label>
            </ion-item>

            <ion-item @click="toEditEmail()">
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
              <ion-label>email</ion-label>
            </ion-item>

            <ion-item @click="toEditPassword()">
              <ion-icon slot="end" :icon="chevronForwardOutline"></ion-icon>
              <ion-label>password</ion-label>
            </ion-item>
          </ion-list>
        </div>

    
        <ion-button class="signout" @click="signout()">
          <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
          Signout
        </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonItem, IonList , IonIcon} from '@ionic/vue';
import { logOutOutline, checkmarkOutline, chevronForwardOutline } from 'ionicons/icons';

import firebase from 'firebase/app';
import 'firebase/auth';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonLabel, IonItem, IonList, IonIcon },
  setup() {
    return {
      logOutOutline,
      checkmarkOutline,
      chevronForwardOutline,
      originalUserData: {},
      userData: {
        displayName: '',
        email: '',
      },
    }
  },
  created() {
    (this as any).originalUserData = firebase.auth().currentUser;
    (this as any).userData.displayName = (this as any).originalUserData.displayName;
    (this as any).userData.email = (this as any).originalUserData.email;
  },
  methods: {
    update() {
      const originalUserData = (this as any).originalUserData;
      const userData = (this as any).userData;

      if(!originalUserData) {
        return;
      }
      // update displayName
      if(userData.displayName !== originalUserData.displayName) {
        originalUserData.updateProfile({
          displayName: userData.displayName,
        }).then(() => {
          console.log('displayName updated!');
        }).catch((error: any) => {
          console.error(error);
        });
      }
      // update email
      // **in progress!**
      if(userData.email !== originalUserData.email) {
        originalUserData.updateEmail(userData.email).then(() => {
          console.log('email updated!');
        }).catch((error: any) => {
          console.error(error);
        });
      }
    },
    signout() {
      firebase.auth().signOut().then(() => {
        (this as any).$router.push('/signin');
      });
    },
    toEditName() {
      (this as any).$router.push('/edit/name');
    },
    toEditEmail() {
      (this as any).$router.push('/edit/email');
    },
    toEditPassword() {
      (this as any).$router.push('/edit/password');
    }
  }
}
</script>

<style scoped>
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