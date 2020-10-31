<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compose</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Componse</ion-title>
        </ion-toolbar>
      </ion-header>
      <button @click="sendPost()">send!</button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import firebase from 'firebase';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default  {
  name: 'Tab1',
  
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      newPost: {
        
      }
    }
  },
  methods: {
    sendPost() {
      firebase.database().ref('posts').push({
        text: "fugafuga"
      });
      console.log('send!')
    }
  }
}
</script>