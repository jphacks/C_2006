<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Search</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <!-- no posts -->
      <div v-if="posts.length === 0" class="search">
        <ion-list>
          <ion-item>
            <ion-icon slot="start" :icon="cashOutline"></ion-icon>
            <ion-label>Cost</ion-label>
            <ion-select value="all" v-model="tags.cost">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="less-1000">0-1000円</ion-select-option>
              <ion-select-option value="5000">1000-5000円</ion-select-option>
              <ion-select-option value="10000">5000-10000円</ion-select-option>
              <ion-select-option value="more-10000">10000円-</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-icon slot="start" :icon="peopleOutline"></ion-icon>
            <ion-label>With</ion-label>
            <ion-select value="all" v-model="tags.with">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="alone">1人で</ion-select-option>
              <ion-select-option value="friend">友達と</ion-select-option>
              <ion-select-option value="lover">恋人と</ion-select-option>
              <ion-select-option value="family">家族と</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-icon slot="start" :icon="hourglassOutline"></ion-icon>
            <ion-label>Time</ion-label>
            <ion-select value="all"  v-model="tags.time">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="less-hour">0-1h</ion-select-option>
              <ion-select-option value="3hours">1-3h</ion-select-option>
              <ion-select-option value="6hours">3-6h</ion-select-option>
              <ion-select-option value="more-6hours">6h-</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-icon slot="start" :icon="folderOutline"></ion-icon>
            <ion-label>Genre</ion-label>
            <ion-select value="all" v-model="tags.genre">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="cook">Cook</ion-select-option>
              <ion-select-option value="play">Play</ion-select-option>
              <ion-select-option value="watch">Watch</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-button @click="getPosts()">
          <ion-icon slot="start" :icon="searchOutline"></ion-icon>
          Search
        </ion-button>
      </div>
      <!-- success get posts -->
      <div v-else class="result">
        <ion-button expand="full" @click="clearPosts">条件を変えて検索する</ion-button>
        <post-container :posts="posts" @postkey="toDetailView"/>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonIcon, IonButton, loadingController, toastController } from '@ionic/vue';
import { searchOutline, cashOutline, hourglassOutline, peopleOutline, folderOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import postContainer from '@/components/postContainer.vue';

import firebase from 'firebase/app';
import 'firebase/database';

export default  {
  name: 'Tab2',
  components: { postContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage,  IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonIcon, IonButton },
  setup() {
    return {
      searchOutline,
      cashOutline,
      hourglassOutline,
      peopleOutline,
      folderOutline,
      isSearch: true,
      router: useRouter(),
    }
  },
  data() {
    return {
      tags: {
        cost: 'all',
        genre: 'all',
        time: 'all',
        with: 'all',
      },
      posts: [] as any
    }
  },
  methods: {
    // searchボタンをクリックしたら、データを受け取る。
    //データが存在すれば success というトーストを表示して投稿を表示する
    //データが存在しなければ failed というトーストを表示して検索画面のまま。
    
    async getPosts(): Promise<any>{
      // loading
      const loading = await loadingController
        .create({
          message: 'Please wait...',
          duration: 3000,
        });

      await loading.present();

      setTimeout(function() {
        loading.dismiss()
      }, 10000);

      const postsRef = firebase.database().ref('posts');
      postsRef.orderByChild('composedAt')
        .limitToLast(10)
        .once('value')
        .then((snapshot) => {
          (this as any).storeInPosts(snapshot.val());
          loading.dismiss();
          (this as any).openToast(true);
        });
    },
    async openToast(flag: boolean) {
      const toast = await toastController
        .create({
          message: flag? 'succeed' : 'failed',
          color: flag? 'success' : 'danger',
          duration: 2000
        })
      return toast.present();
    },
    search() {
      for(const key of Object.keys((this as any).tags)) {
        if((this as any).tags[key] !== 'all') {
          (this as any).posts = (this as any).posts.filter((post: any) => {
            return post.tags[key] === (this as any).tags[key];
          });
        }
      }

      // solution with firebase
      //
      // const postsRef = firebase.database().ref('posts');
      // postsRef.orderByChild('tags/cost')
      //   .equalTo((this as any).tags.cost)
      //   .limitToLast(10)
      //   .once('value')
      //   .then((snapshot) => {
      //     (this as any).storeInPosts(snapshot.val());
      //   });
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
    toDetailView(key: string) {
      (this as any).router.push(`/post/${key}`);
    },
    clearPosts() {
      (this as any).posts = [];
    }
  }
}
</script>

<style scoped>
.search{
  margin: 0 5%;
  text-align: center;
}
</style>