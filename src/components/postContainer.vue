<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="post in posts"  :key="post.id" size="4">
        <img :src="post.imageUrl" alt="picture" @click="$emit('postkey',post.key)">
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from '@ionic/vue';

export default {
  components: { IonCol, IonGrid, IonRow },
  props: ['posts'],
  emits: ['postkey']
}
</script>

<style scoped>
img{
  width: calc(100vmin/3);
  height: calc(100vmin/3);
  object-fit: contain;
}
</style>