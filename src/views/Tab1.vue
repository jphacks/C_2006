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
    
      <post-container @postid="toDetailView"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useRouter } from 'vue-router';
import postContainer from '@/components/postContainer.vue';

export default  {
  name: 'Tab1',
  components: { postContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    return {
      router: useRouter()
    }
  },
  methods: {
    toDetailView(id: string) {
      (this as any).router.push(`/post/${id}`);
    }
  }
}
</script>