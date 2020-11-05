<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Stocks</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Stocks</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <post-container @postid="toDetailView"/>
      {{ posts }}
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';
import postContainer from '@/components/postContainer.vue';

import firebase from 'firebase';

export default  {
  name: 'Tab1',
  components: { postContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    return {
      router: useRouter()
    }
  },
  data() {
    return {
      posts: [] as any,
    }
  },
  methods: {
    toDetailView(id: string) {
      (this as any).router.push(`/post/${id}`);
    },
    async storeInPosts(data: object) {
      (this as any).posts = Object.entries(data).map(([key, value]) => ({
        key: key,
        post: value.key
      }));
    },
  },
  async created() {
    const uid = firebase.auth().currentUser?.uid;
    await firebase.database().ref(`stocks/${uid}`)
      .orderByChild('key')
      .limitToLast(10)
      .once('value')
      .then(((snapshot) => {
        console.log(snapshot.val());
        (this as any).storeInPosts(snapshot.val());
      }));
  }
}
</script>