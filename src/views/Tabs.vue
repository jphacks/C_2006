<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" @click="toStockView()">
          <ion-icon :icon="bookmarkOutline" />
          <ion-label>Stocks</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" @click="toSearchView()">
          <ion-icon :icon="searchOutline" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" @click="toMypage()">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Mypage</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { searchOutline, bookmarkOutline, personCircleOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      searchOutline,
      bookmarkOutline,
      personCircleOutline
    }
  },
  methods: {
    toStockView() {
      (this as any).$router.push('/stock');
    },
    toSearchView() {
      (this as any).$router.push('/search');
    },
    toMypage() {
      (this as any).$router.push('/mypage');
    }
  }
}
</script>