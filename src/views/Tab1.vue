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

      <div v-if="isEmpty" class="nopost">
      </div>

      <div v-else>
        <post-container :posts="posts" @postkey="toDetailView"/>
      </div>

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
    }
  },
  computed: {
    isEmpty(){
      return ((this as any).posts.length === 0) ? true : false;
    }
  },
  methods: {
    toDetailView(key: string) {
      (this as any).router.push(`/post/${key}`);
    }
  },
  async created() {
    const uid = firebase.auth().currentUser?.uid;
    await firebase.database().ref(`stocks/${uid}`)
      .orderByChild('key')
      .limitToLast(10)
      .on('child_added', (stockSnap) => {
        firebase.database().ref(`posts/${stockSnap.val().key}`)
          .once('value')
          .then((postSnap) => {
            const value = postSnap.val();
            (this as any).posts.push({
              key: stockSnap.val().key,
              composedAt: value.composedAt,
              imageUrl: value.imageUrl,
            });
          });
      });
    await firebase.database().ref(`stocks/${uid}`)
      .limitToLast(10)
      .on('child_removed', (stockSnap) => {
        (this as any).posts = (this as any).posts.filter((post: any) => {
          return post.key !== stockSnap.val().key;
        })
      });
  }
}
</script>

<style scoped>
.nopost {
  background-image: url("../../public/assets/nopost.svg");
  width: 300px;
  height: 300px;
  margin: 0 auto;
}
</style>