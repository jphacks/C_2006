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
              <ion-input placeholder="current Password" type="current-password"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">new Password</ion-label>
              <ion-input placeholder="new Password" type="new-password"></ion-input>
            </ion-item>
          </ion-list>
        </div>

    
        <ion-button class="update" @click="update()">
            <ion-icon slot="start" :icon="checkmarkOutline"></ion-icon>
            Update
          </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonInput, IonItem, IonList , IonIcon} from '@ionic/vue';
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
    backSetting() {
      (this as any).$router.push('/setting');
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