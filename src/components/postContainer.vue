<template>
  <ion-grid>
    <ion-row>
      <ion-col v-for="post in posts"  :key="post.id" size="4">
        <img src="../../public/assets/icon/icon.png" alt="picture" @click="toDetailView(post.id)">
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { IonCol, IonGrid, IonRow } from '@ionic/vue';
import { useRouter } from 'vue-router';

export default {
  components: { IonCol, IonGrid, IonRow },
  setup() {
    return{
      router: useRouter()
    }
  },
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
  methods: {
    toDetailView(id: string) {
      (this as any).router.push(`/post/${id}`);
    }
  }
}
</script>

