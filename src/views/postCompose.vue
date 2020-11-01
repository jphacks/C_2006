<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compose</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Componse</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="image-wrapper">
        <img v-if="newPost.image" :src="newPost.image" alt="image">
        <img v-else src="../../public/assets/noimage.svg" alt="image">
        <label for="fileUpload" class="btn-wrapper" >
          <ion-fab-button  class="upload-btn"><ion-icon :icon="imageOutline"></ion-icon></ion-fab-button>
          <input id="fileUpload" type="file" @change="upload">
        </label>
      </div>

      <div class="post-wrapper">
        <ion-list>
          <ion-item>
            <ion-icon slot="start" :icon="cashOutline"></ion-icon>
            <ion-label>Cost</ion-label>
            <ion-select value="all">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="less-1000">0-1000円</ion-select-option>
              <ion-select-option value="5000">1000-5000円</ion-select-option>
              <ion-select-option value="10000">5000-10000円</ion-select-option>
              <ion-select-option value="more-10000">10000円-</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-icon slot="start" :icon="peopleOutline"></ion-icon>
            <ion-label>With</ion-label>
            <ion-select value="all">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="alone">1人で</ion-select-option>
              <ion-select-option value="friend">友達と</ion-select-option>
              <ion-select-option value="lover">恋人と</ion-select-option>
              <ion-select-option value="family">家族と</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-icon slot="start" :icon="hourglassOutline"></ion-icon>
            <ion-label>Time</ion-label>
            <ion-select value="all">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="less-hour">0-1h</ion-select-option>
              <ion-select-option value="3hours">1-3h</ion-select-option>
              <ion-select-option value="6hours">3-6h</ion-select-option>
              <ion-select-option value="more-6hours">6h-</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item>
            <ion-icon slot="start" :icon="folderOutline"></ion-icon>
            <ion-label>Genre</ion-label>
            <ion-select value="all">
              <ion-select-option value="all">All</ion-select-option>
              <ion-select-option value="cook">Cook</ion-select-option>
              <ion-select-option value="play">Play</ion-select-option>
              <ion-select-option value="watch">Watch</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>

        <ion-label>Notes</ion-label>
        <ion-textarea rows="6" cols="20" placeholder="Enter any notes here..."></ion-textarea>

        <ion-button>
          <ion-icon slot="start" :icon="pushOutline"></ion-icon>
          Upload Your Post
        </ion-button>

        <ion-button @click="sendPost()">
          send
        </ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import firebase from 'firebase';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonLabel, IonFabButton, IonSelect, IonSelectOption, IonList, IonItem, IonTextarea, IonButton } from '@ionic/vue';
import { imageOutline, cashOutline, hourglassOutline, peopleOutline, folderOutline, pushOutline } from 'ionicons/icons';

interface PostData{
  image: unknown;
  text: string;
  tags: {
    cost: string;
    with: string;
    genre: string;
    time: string;
  };
}

export default {
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon, IonLabel, IonFabButton, IonSelect, IonSelectOption, IonList, IonItem, IonTextarea, IonButton },
  setup() {
    return {
      imageOutline,
      cashOutline,
      hourglassOutline,
      peopleOutline,
      folderOutline,
      pushOutline,
    }
  },
  data() {
    const newPost: PostData = {image: undefined,text: '', tags: {cost: '', with: '', genre: '', time: ''}}
    return {
      newPost,
      samplePost: {
        text: 'hogehogehogehoge',
        tags: {cost: '1000-5000円', with: '友達と', genre: 'Cook', time: '0-1h'},
      }
    }
  },
  methods: {
    sendPost() {
      firebase.database().ref('posts').push((this as any).samplePost)
        .then(() => {
          console.log('send!');
          (this as any).$router.push('/')
        });
    },
    async upload(event: any) {
      const files = event.target.files || event.dataTransfer.files
      if(files.length === 0){
        return;
      }
      const file = files[0]
      if (this.checkFile(file)) {
        (this as any).newPost.image  = await (this as any).getBase64(file)
      }
    },
    getBase64(file: any){
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    checkFile(file: any) {
      let result = true
      const SIZE_LIMIT = 5000000 // 5MB
      // キャンセルしたら処理中断
      if (!file) {
        result = false
      }
      // jpeg か png 関連ファイル以外は受付けない
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        result = false
      }
      // 上限サイズより大きければ受付けない
      if (file.size > SIZE_LIMIT) {
        result = false
      }
      return result
    }
  }
}
</script>

<style scoped>
.image-wrapper{
  position: relative;
}

.btn-wrapper{
  position: absolute;
  right: 20px;
  bottom: 20px;
  margin: 0;
}

#fileUpload{
  display: none;
}

.upload-btn{
  --border-radius: 50%;
}


.post-wrapper{
  margin: 0 5%;
  text-align: center;
}
</style>