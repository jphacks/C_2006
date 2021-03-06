<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="isLoading" :fullscreen="true">
      Loading
    </ion-content>

    <ion-content :fullscreen="true" v-else-if="isExist" class="detailcontent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Detail</ion-title>
        </ion-toolbar>
      </ion-header>
      

      <img :src="post.imageUrl" alt="picture" class="image">
      <ion-chip class="cost">
        <ion-icon :icon="cashOutline"></ion-icon>
        <ion-label>{{ post.tags.cost }}</ion-label>
      </ion-chip>
      <ion-chip class="with">
        <ion-icon :icon="peopleOutline"></ion-icon>
        <ion-label>{{ post.tags.with }}</ion-label>
      </ion-chip>
      <ion-chip class="time">
        <ion-icon :icon="hourglassOutline"></ion-icon>
        <ion-label>{{ post.tags.time }}</ion-label>
      </ion-chip>
      <ion-chip class="genre">
        <ion-icon :icon="folderOutline"></ion-icon>
        <ion-label>{{ post.tags.genre }}</ion-label>
      </ion-chip>

      <div v-if="isMyPost">
        <ion-button @click="deletePost()">
          <ion-icon :icon="trashOutline"></ion-icon>
            Delete
        </ion-button>
      </div>

      <div v-else>
        <ion-button v-if="!isStocked" @click="stockPost()">
          <ion-icon :icon="bookmarkOutline" class="stock-icon"></ion-icon>
            Stock
        </ion-button>
        <ion-button v-else @click="unstockPost()">
          <ion-icon :icon="bookmarkOutline" class="stock-icon"></ion-icon>
            unStock
        </ion-button>
      </div>
      
      <p>
        {{ post.text }}
      </p>
    </ion-content>

    <ion-content :fullscreen="true" v-else>
      <div class="nopost"></div>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonIcon, IonLabel, IonButton, toastController } from '@ionic/vue';
import { cashOutline, hourglassOutline, peopleOutline, folderOutline, bookmarkOutline, trashOutline } from 'ionicons/icons';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

interface PostData{
  imageUrl: string;
  text: string;
  tags: {
    cost: string;
    with: string;
    genre: string;
    time: string;
  };
  composedAt: object;
}

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonChip, IonIcon, IonLabel, IonButton },
  setup() {
    return {
      cashOutline,
      hourglassOutline,
      peopleOutline,
      folderOutline,
      bookmarkOutline,
      trashOutline
    }
  },
  data() {
    return {
      post: {
        imageUrl: '',
        text: '',
        tags: {
          cost: '',
          with: '',
          genre: '',
          time: '',
        },
        composedAt: {},
      },
      isLoading: true,
      isExist: true,
      isMyPost: false,
      isStocked: false,
      stockKey: '',
    }
  },
  methods: {
    async stockPost() {
      const key = (this as any).$route.params.id;
      const uid = firebase.auth().currentUser?.uid;

      if(!uid) return;

      firebase.database().ref(`stocks/${uid}`).push({
        key: key,
      }).then((snapshot) => {
        (this as any).openToast('Stocked!','success');
        (this as any).stockKey = snapshot.key;
        (this as any).isStocked = true;
      }).catch((error) => {
        this.openToast('Failed.','danger');
      })
    },
    async unstockPost() {
      const uid = firebase.auth().currentUser?.uid;
      firebase.database().ref(`stocks/${uid}/${(this as any).stockKey}`).remove().then(() => {
        this.openToast('unStocked.','danger');
        (this as any).stockKey = '';
        (this as any).isStocked = false;
      });
    },
    async deletePost() {
      const uid = firebase.auth().currentUser?.uid;
      if (uid !== (this as any).post.uid) {
        this.openToast('This is not your post.','danger');
        return;
      }
      firebase.database().ref(`posts/${(this as any).post.key}`).remove().then(() => {
        (this as any).openToast('Deleted.','danger');
        (this as any).$router.push('/mypage');
      });
    },
    async openToast(text: string,status: string) {
      const toast = await toastController
        .create({
          message: text,
          cssClass: 'tabs-bottom',
          color: status,
          duration: 2000
        })
      return toast.present();
    },
  },
  async created() {
    const key = (this as any).$route.params.id;
    const postRef = firebase.database().ref(`posts/${key}`);
    const uid = firebase.auth().currentUser?.uid;

    await postRef.once('value').then((snapshot) => {
      if(!snapshot.val()) {
        (this as any).isExist = false;
        (this as any).isLoading = false;
        return;
      }
      const value = snapshot.val();
      (this as any).post = {
        key: key,
        imageUrl: value.imageUrl,
        composedAt: value.composedAt,
        tags: value.tags,
        text: value.text,
        uid: value.uid,
      };
      firebase.database().ref(`stocks/${uid}`)
        .orderByChild('key')
        .equalTo(key)
        .once('value')
        .then((snapshot) => {
          if(snapshot.val()) {
            (this as any).isStocked = true;
            (this as any).stockKey = Object.keys(snapshot.val())[0];
          }
        });
      (this as any).isMyPost = uid === value.uid;
      (this as any).isLoading = false;
    });
  }
}
</script>

<style scoped>
ion-chip {
  background-color: white;
  margin: 10px 5px;
}

.cost {
  border:solid 1px #F31010;
}
.cost ion-icon, .cost ion-label{
  color: #F31010;
}

.with {
  border:solid 1px #DC3EF6;
}
.with ion-icon, .with ion-label{
  color: #DC3EF6;
}

.time {
  border:solid 1px #3E93F6;
}
.time ion-icon, .time ion-label{
  color: #3E93F6;
}

.genre {
  border:solid 1px #3EDE05;
}
.genre ion-icon, .genre ion-label{
  color: #3EDE05;
}

.image{
  width: 100vmin;
  height: 100vmin;
  object-fit: contain;
}

.nopost {
  background-image: url("../../public/assets/nopost.svg");
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.detailcontent {
  text-align: center;
}

.stock-icon {
  margin-right: 5px;
}
</style>