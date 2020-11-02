<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="post in posts"  :key="post.id" size="4">
        <img src="../../public/assets/icon/icon.png" alt="picture" @click="$emit('postid',post.id)">
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from '@ionic/vue';

export default {
  components: { IonCol, IonGrid, IonRow },
  data() {
    return {
      posts:[
        {id: '1', pic: "../../public/assets/icon/icon.png"},
        {id: '2', pic: "../../public/assets/icon/icon.png"},
        {id: '3', pic: "../../public/assets/icon/icon.png"},
        {id: '4', pic: "../../public/assets/icon/icon.png"},
        {id: '5', pic: "../../public/assets/icon/icon.png"},
        {id: '6', pic: "../../public/assets/icon/icon.png"},
        {id: '7', pic: "../../public/assets/icon/icon.png"},
        {id: '8', pic: "../../public/assets/icon/icon.png"},
        {id: '9', pic: "../../public/assets/icon/icon.png"},
        {id: '10', pic: "../../public/assets/icon/icon.png"},
        {id: '11', pic: "../../public/assets/icon/icon.png"},
        {id: '12', pic: "../../public/assets/icon/icon.png"}
      ]
    }
  },
  emits: ['postid']
}
</script>

