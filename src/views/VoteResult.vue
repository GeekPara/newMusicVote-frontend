<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="2">
          <v-card-title>
            <span class="font-weight-bold">{{itemInfo.title}}</span>
            <v-spacer />
            <v-chip class="ma-2" color="red" text-color="white" v-if="itemInfo.isEnded">已结束</v-chip>
          </v-card-title>
          <v-card-subtitle>这里是投票结果</v-card-subtitle>
          <v-card-text class="text-body-2">
            <ul style="color:black">
              <li>
                午歌多用流行音乐，节奏明快、易于演唱。
                <strong>少用说唱部分过多的、曲调过高的歌曲。</strong>
              </li>
              <li>
                <strong>每次投票将按照票数排名从前往后选取歌曲，每周一换</strong>
              </li>
            </ul>
          </v-card-text>
          <music-item
            v-for="item in items"
            :key="item.musicId"
            :title="item.title"
            :artist="item.artist"
            :add-by="item.addBy"
            :music-id="item.musicId"
            :vote-item="itemId"
            :vote="item.vote"
            @showSnackbar="snackbar"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MusicItem from '../components/musicItemResult.vue';
export default {
  data: function () {
    return {
      token: sessionStorage.getItem('token'),
      sid: sessionStorage.getItem('sid'),
      itemId: this.$route.params.id,
      itemInfo: {
        title: '正在加载',
        isEnded: false,
        end: '2004-3-30'
      },
      buttonText: '添加',
      buttonCount: 0,
      items: [],
      addMusic: {
        title: null,
        artist: null
      }
    }
  },
  components: {
    'music-item': MusicItem
  },
  methods: {
    reload: async function () {
      let res = await this.tcb.callFunction({
        name: 'get-result',
        data: {
          token: this.token,
          sid: this.sid,
          voteItem: this.itemId
        },
        parse: true
      })
      if (res.code) {
        console.error(`TCB Error: ${res.code} Message: ${res.message} requestId: ${res.requestId}`);
        return this.$emit('showSnackbar', "服务器内部错误，请稍后再试", "error");
      }
      if (!res.result.status) {
        console.error(`Login Error: sid: ${this.g_sid} requestId: ${res.requestId}`);
        this.$emit('showSnackbar', res.result.message, "error");
        return this.$router.push(`/voteItem/${this.itemId}`);
      }
      this.itemInfo.title = res.result.data.name;
      this.itemInfo.isEnded = res.result.data.isEnded;
      this.itemInfo.end = res.result.data.end;
      this.items = res.result.data.musics;
    },
    snackbar: function (content, clolor) {
      this.$emit('showSnackbar', content, clolor);
    },
  },
  created: function () {
    this.reload();
  }
}
</script>
