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

      <div v-if="isEmpty">
        No stocked posts
      </div>

      <post-container :posts="posts" @postid="toDetailView"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';
import postContainer from '@/components/postContainer.vue';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
      isEmpty: false,
    }
  },
  methods: {
    toDetailView(id: string) {
      (this as any).router.push(`/post/${id}`);
    },
    async storeKeys(data: object) {
      return Object.entries(data).map(([key, value]) => ({
        key: key,
        post: value.key
      }));
    },
    async storeInPosts(data: object) {
      (this as any).posts = Object.entries(data).map(([key, value]) => ({
        key: key,
        composedAt: (value as any).composedAt,
        imageUrl: (value as any).imageUrl,
        tags: (value as any).tags,
        text: (value as any).text,
      }));
    },
  },
  async created() {
    const uid = firebase.auth().currentUser?.uid;
    await firebase.database().ref(`stocks/${uid}`)
      .orderByChild('key')
      .limitToLast(10)
      .once('value')
      .then(async (snapshot) => {
        if(!snapshot.val()) {
          console.log('posts is nothing');
          (this as any).isEmpty = true;
          return;
        }
        const postkeys = await (this as any).storeKeys(snapshot.val());
        for(let i = 0; i < postkeys.length; i++) {
          firebase.database().ref(`posts/${postkeys[i].post}`)
            .once('value')
            .then((snapshot) => {
              console.log(snapshot.val());
              (this as any).posts.push(snapshot.val());
          });
        }
      });
  }
}
</script>