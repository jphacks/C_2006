<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mypage</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Mypage</ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        <div class="userarea">
          <h1>{{ userName }}</h1>
          <ion-button @click="toSettingView()">
            <ion-icon :icon="settingsOutline" />
          </ion-button>
        </div>

        <post-container :posts="myposts" @postkey="toDetailView"/>

        <ion-fab class="fab-btn">
          <ion-fab-button @click="toComposeView()">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>

      <div v-if="!myposts.length" class="nopost">
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { settingsOutline, add } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import postContainer from '@/components/postContainer.vue';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default  {
  name: 'Tab3',
  components: { postContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonFab, IonFabButton, IonIcon },
  setup() {
    return {
      settingsOutline,
      add,
      router: useRouter(),
      userName: firebase.auth().currentUser?.displayName
    }
  },
  data() {
    return {
      myposts: [] as any,
    }
  },
  methods: {
    toDetailView(id: string) {
      (this as any).router.push(`/post/${id}`);
    },
    toSettingView() {
      (this as any).$router.push('/setting');
    },
    toComposeView() {
      (this as any).$router.push('/compose');
    },
    ionViewDidEnter() {
      (this as any).userName = firebase.auth().currentUser?.displayName;
    },
    addPost(snap: any) {
      const post = snap.val();
      (this as any).myposts.push({
        key: snap.key,
        composedAt: post.composedAt,
        imageUrl: post.imageUrl,
        tags: post.tags,
        text: post.text,
      });
    },
  },
  async created(){
    const uid: string = firebase.auth().currentUser?.uid!;
    const postsRef = firebase.database().ref('posts');
    await postsRef.orderByChild('uid')
      .equalTo(uid)
      .limitToLast(10)
      .on('child_added', (this as any).addPost);
  }
}
</script>

<style scoped>
.userarea{
  margin: 10px 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.userarea h1{
  margin: 20px 0px;
}

.fab-btn{
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.nopost {
  background-image: url("../../public/assets/nopost.svg");
  width: 300px;
  height: 300px;
  margin: auto;
}
</style>