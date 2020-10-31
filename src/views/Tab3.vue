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
          <h1>Username</h1>
          <ion-button>
            <ion-icon :icon="settingsOutline" />
          </ion-button>
        </div>

        <post-container/>

        <ion-fab class="fab-btn">
          <ion-fab-button color="danger">
            <ion-icon :icon="add"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonFab, IonFabButton } from '@ionic/vue';
import { settingsOutline, add } from 'ionicons/icons';
import postContainer from '@/components/postContainer.vue';

export default  {
  name: 'Tab3',
  components: { postContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton },
  setup() {
    return {
      settingsOutline,
      add
    }
  }
}
</script>

<style scoped>
.userarea{
  margin: 0 5%;
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
</style>