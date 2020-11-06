<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div class="wrapper">
        <img src="../../public/assets/logo2.svg" alt="logo" class="img">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">name</ion-label>
              <ion-input placeholder="name" type="text" v-model="name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">email</ion-label>
              <ion-input placeholder="email" type="email" v-model="email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">password</ion-label>
              <ion-input placeholder="password" type="password" v-model="passwd"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button class="signup" @click="signup(name, email, passwd)">
            <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
            Signup
          </ion-button>
        </div>
    
        <ion-button class="signin" @click="toSigninView()">
          <ion-icon slot="start" :icon="logInOutline"></ion-icon>
          go to Signin page
        </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon, loadingController, toastController } from '@ionic/vue';
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
      name: '',
      email: '',
      passwd: '',
    }
  },
  methods: {
    async signup(name: string, email: string, passwd: string){
      const loading = await loadingController
      .create({
        message: 'Please wait...',
        duration: 5000,
      });

      await loading.present();


      firebase.auth().createUserWithEmailAndPassword(email, passwd)
        .then((result) => {
          // to solve error "object is possibly 'null'"
          if(result.user === null) {
            loading.dismiss();
            this.openToast('failed','danger');
            return;
          }

          result.user.updateProfile({
            displayName: name
          }).then(() => {
            loading.dismiss();
            this.openToast('Created user','success');
            (this as any).$router.push('/signin');
          })
        })
        .catch(error => {
          console.error(error);
          loading.dismiss();
          this.openToast('failed','danger');
        });
    },
    toSigninView() {
      (this as any).$router.push('/signin');
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
    margin: 150px 0 auto 0;
    padding-right: 10px;
}
.forms{
  margin: 0 5%;
}
.signup{
  margin-top: 30px;
}
.signin{
  margin-top: 50px;
}
</style>