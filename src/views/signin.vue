<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="wrapper">
        <img src="../../public/assets/logo2.svg" alt="logo" class="img">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">email</ion-label>
              <ion-input placeholder="email" type="email" v-model="email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">password</ion-label>
              <ion-input placeholder="password" type="password" v-model="passwd"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button class="signin" @click="signin(email, passwd)">
            <ion-icon slot="start" :icon="logInOutline"></ion-icon>
            Signin
          </ion-button>
        </div>

    
        <ion-button class="signup" @click="toSignupView()">
          <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
          go to Signup page
        </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon , loadingController, toastController } from '@ionic/vue';
import { personAddOutline, logInOutline } from 'ionicons/icons';

import firebase from 'firebase/app';
import 'firebase/auth';

export default  {
  name: 'Tab2',
  components: { IonContent, IonPage, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon },
  setup() {
    return {
      personAddOutline,
      logInOutline,
      email: '',
      passwd: '',
    }
  },
  methods: {
    async signin(email: string, passwd: string){
      const loading = await loadingController
      .create({
        message: 'Please wait...',
        duration: 5000,
      });

      await loading.present();

      firebase.auth().signInWithEmailAndPassword(email, passwd).then(
        (user) => {
          loading.dismiss();
          this.openToast('success login','success');
          (this as any).$router.push('/');
        },
        (error) => {
          console.error(error);
          loading.dismiss();
          this.openToast('failed','danger');
        }
      );
    },
    toSignupView() {
      (this as any).$router.push('/signup');
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
  }
}
</script>

<style scoped>
.wrapper{
  text-align: center;
  background-image: url("../../public/assets/sign-background.svg");
  background-repeat: no-repeat;
  background-size: cover;
}
.img{
  margin: 150px auto 0 auto;
  padding-right: 10px;
}
.forms{
  margin: 0 5%;
}
.signin{
  margin-top: 30px;
}
.signup{
  margin-top: 50px;
}
</style>