<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Detail</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Detail</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <img :src="post.imageUrl" alt="picture">
      <ion-chip>
        <ion-icon :icon="cashOutline"></ion-icon>
        <ion-label>{{ post.tags.cost }}</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-icon :icon="peopleOutline"></ion-icon>
        <ion-label>{{ post.tags.with }}</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-icon :icon="hourglassOutline"></ion-icon>
        <ion-label>{{ post.tags.time }}</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-icon :icon="folderOutline"></ion-icon>
        <ion-label>{{ post.tags.genre }}</ion-label>
      </ion-chip>

      
      <ion-button>
        <ion-icon :icon="bookmarkOutline"></ion-icon>
      </ion-button>
      
      <p>
        {{ post.text }}
      </p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonIcon, IonLabel, IonButton } from '@ionic/vue';
import { cashOutline, hourglassOutline, peopleOutline, folderOutline, bookmarkOutline } from 'ionicons/icons';
import firebase from 'firebase';

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
    }
  },
  async created() {
    const key = (this as any).$route.params.id;
    const postRef = firebase.database().ref(`posts/${key}`);
    const storageRef = firebase.storage().ref(`images/${key}.jpg`);

    await postRef.once('value').then((snapshot) => {
        const value = snapshot.val();
        (this as any).post = {
          key: key,
          composedAt: value.composedAt,
          tags: value.tags,
          text: value.text,
        };
      });
  }
}
</script>
