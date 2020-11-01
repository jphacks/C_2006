<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Signup</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Signup</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="wrapper">
        <img src="../../public/assets/logo.svg" alt="logo" class="img">
        <div class="forms">
          <ion-list>
            <ion-item>
              <ion-label position="stacked">name</ion-label>
              <ion-input placeholder="name" type="text" v-model="name"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">email</ion-label>
              <ion-input placeholder="email" type="email"></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">password</ion-label>
              <ion-input placeholder="password" type="password" v-model="passwd"></ion-input>
            </ion-item>
          </ion-list>

          <ion-button class="signup" @click="signup(name, passwd)">
            <ion-icon slot="start" :icon="personAddOutline"></ion-icon>
            Signup
          </ion-button>
        </div>
    
        <ion-button class="signin" href="/signin">
          <ion-icon slot="start" :icon="logInOutline"></ion-icon>
          go to Signin page
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
    signup(name: string, passwd: string): void {
      firebase.auth().createUserWithEmailAndPassword(name, passwd)
        .then((user: any) => {
          console.log(user.email);
          (this as any).$router.push('/signin');
        })
        .catch(error => {
          console.error(error);
        });
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
.signup{
  margin-top: 30px;
}
.signin{
  margin-top: 50px;
}
</style>