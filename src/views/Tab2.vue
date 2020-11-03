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
      <!--<div v-if="!posts.length" class="search">-->
      <div v-if="isSearch" class="search">
        <ion-list>
          <ion-item>
            <ion-icon slot="start" :icon="cashOutline"></ion-icon>
            <ion-label>Cost</ion-label>
            <ion-select value="all">
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
            <ion-select value="all">
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
            <ion-select value="all">
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
            <ion-select value="all">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="cook">Cook</ion-select-option>
              <ion-select-option value="play">Play</ion-select-option>
              <ion-select-option value="watch">Watch</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-button>
        <!--<ion-button @click="getPosts()">-->
          <ion-icon slot="start" :icon="searchOutline"></ion-icon>
          Search
        </ion-button>
        
        {{ posts }}
      </div>
      <!-- success get posts -->
      <div v-else class="result">
        <post-container @postid="toDetailView"/>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonIcon, IonButton, loadingController, toastController } from '@ionic/vue';
import { searchOutline, cashOutline, hourglassOutline, peopleOutline, folderOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import postContainer from '@/components/postContainer.vue';
import firebase from 'firebase';

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
      router: useRouter()
    }
  },
  data() {
    return {
      posts: [] as any
    }
  },
  methods: {
    // searchボタンをクリックしたら、データを受け取る。
    //データが存在すれば success というトーストを表示して投稿を表示する
    //データが存在しなければ failed というトーストを表示して検索画面のまま。
    /* 
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
      }, 3000);

      let getPostFlag = true;

      const refPosts = firebase.database().ref('posts');
      await refPosts.limitToLast(10).on('child_added', (snapshot: any) => {
        console.log(snapshot);
        const post = snapshot.val();
        console.log(post);
      });

      // Add to the post by random numbers.
      const num = Math.floor(Math.random() * Math.floor(2))
      console.log(num)
      if(num === 1){
        // add to the post 
        //this.posts.push("hoge")
      }else{
        // not add 
        getPostFlag = false;
      }
      loading.dismiss();

      await this.openToast(getPostFlag)
    },
    async openToast(flag: boolean) {
      const toast = await toastController
        .create({
          message: flag? 'succeed' : 'failed',
          duration: 2000
        })
      return toast.present();
    },*/
    toDetailView(id: string) {
      (this as any).router.push(`/post/${id}`);
    }
  },
  created() {
    const postsRef = firebase.database().ref('posts')
    postsRef.orderByChild('composedAt').limitToLast(10).once('value').then((snapshot) => {
      (this as any).posts = Object.entries(snapshot.val()).map(([key, value]) => ({
        key: key,
        composedAt: (value as any).composedAt,
        imageUrl: (value as any).imageUrl,
        tags: (value as any).tags,
        text: (value as any).text,
      }));
    });
  }
}
</script>

<style scoped>
.search{
  margin: 0 5%;
  text-align: center;
}
</style>