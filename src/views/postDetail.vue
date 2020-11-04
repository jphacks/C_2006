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
      
      <img src="../../public/assets/icon/icon.png" alt="picture">
      <ion-chip>
        <ion-icon :icon="cashOutline"></ion-icon>
        <ion-label>0-1000円</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-icon :icon="peopleOutline"></ion-icon>
        <ion-label>All</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-icon :icon="hourglassOutline"></ion-icon>
        <ion-label>1-3h</ion-label>
      </ion-chip>
      <ion-chip>
        <ion-icon :icon="folderOutline"></ion-icon>
        <ion-label>Play</ion-label>
      </ion-chip>

      
      <ion-button>
        <ion-icon :icon="bookmarkOutline"></ion-icon>
      </ion-button>
      

      <p>
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
      </p>
      {{ $route.params.id }}
      {{ post }}
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonIcon, IonLabel, IonButton } from '@ionic/vue';
import { cashOutline, hourglassOutline, peopleOutline, folderOutline, bookmarkOutline } from 'ionicons/icons';
import firebase from 'firebase';

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
      post: {},
    }
  },
  created() {
    const key = (this as any).$route.params.id;
    firebase.database()
      .ref(`posts/${key}`)
      .once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        (this as any).post = {
          key: key,
          composedAt: value.composedAt,
          imageUrl: value.imageUrl,
          tags: value.tags,
          text: value.text,
        };
      });
  }
}
</script>
