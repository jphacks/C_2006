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

      <p>
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
      </p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonChip, IonIcon, IonLabel } from '@ionic/vue';
import { cashOutline, hourglassOutline, peopleOutline, folderOutline } from 'ionicons/icons';

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonChip, IonIcon, IonLabel },
  setup() {
    return {
      cashOutline,
      hourglassOutline,
      peopleOutline,
      folderOutline,
    }
  },
}
</script>
