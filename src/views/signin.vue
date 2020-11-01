<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Signin</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Signin</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="wrapper">
        <img src="../../public/assets/logo.svg" alt="logo" class="img">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">email</ion-label>
              <ion-input placeholder="email" type="email" v-model="name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">password</ion-label>
              <ion-input placeholder="password" type="password" v-model="passwd"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button class="signin" @click="signin(name, passwd)">
            <ion-icon slot="start" :icon="logInOutline"></ion-icon>
            Signin
          </ion-button>
        </div>

    
        <ion-button class="signup" href="/signup">
          <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
          go to Signup page
        </ion-button>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonInput, IonItem, IonList , IonIcon} from '@ionic/vue';
import { personAddOutline, logInOutline } from 'ionicons/icons';
import firebase from 'firebase';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonLabel, IonInput, IonItem, IonList, IonIcon },
  setup() {
    return {
      personAddOutline,
      logInOutline,
      name: '',
      passwd: '',
    }
  },
  methods: {
    signin(name: string, passwd: string): void {
      firebase.auth().signInWithEmailAndPassword(name, passwd).then(
        (user) => {
          console.log(user);
          (this as any).$router.push('/');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
</script>

<style scoped>
.wrapper{
  text-align: center;
}
.img{
    width: 80%;
    margin: auto;
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