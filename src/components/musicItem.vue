<template>
  <v-container>
    <v-card elevation="4">
      <v-card-title>
        <span class="float-left">{{title}} - {{artist}}</span>
      </v-card-title>
      <v-card-subtitle>由{{addBy}}添加</v-card-subtitle>
      <v-card-text>
        <span>搜索这首歌：</span>
        <a :href="links.kugou" target="_blank">
          <v-avatar>
            <v-img
              src="https://www.kugou.com/yy/static/images/play/logo.png"
              max-height="32"
              max-width="32"
            />
          </v-avatar>
        </a>
        <a :href="links.qq" target="_blank">
          <v-avatar>
            <v-img src="https://y.qq.com/favicon.ico" max-height="32" max-width="32" />
          </v-avatar>
        </a>
        <a :href="links.netease" target="_blank">
          <v-avatar>
            <v-img src="https://s1.music.126.net/style/favicon.ico" max-height="32" max-width="32" />
          </v-avatar>
        </a>
        <v-btn color="light-blue" class="float-right" @click="vote">{{buttonText}}</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'add-by', 'artist', 'music-id', 'vote-item'],
  data: function () {
    return {
      buttonText: '投票',
      count: 0,
      links:{
        kugou:`https://www.kugou.com/yy/html/search.html#searchKeyWord=${this.artist}%20-%20${this.title}`,
        qq:`https://y.qq.com/portal/search.html#w=${this.title}-%20${this.artist}`,
        netease:`https://music.163.com/#/search/m/?s=${this.title}-${this.artist}`
      }
    }
  },
  methods: {
    vote: async function () {
      if (!this.count) {
        this.buttonText = '仅一次机会，确定？';
        this.count += 1;
        return
      }
      let res = await this.tcb.callFunction({
        name: 'vote-music',
        data: {
          token: sessionStorage.getItem('token'),
          sid: sessionStorage.getItem('sid'),
          voteItem: this.voteItem,
          musicId: this.musicId
        },
        parse: true
      })
      if (res.code) {
        console.error(`TCB Error: ${res.code} Message: ${res.message} requestId: ${res.requestId}`);
        return this.$emit('showSnackbar', "服务器内部错误，请稍后再试", "error");
      }
      if (!res.result.status) {
        console.error(`Vote Error: requestId: ${res.requestId}`);
        this.buttonText = '投票出错，点击重试';
        return this.$emit('showSnackbar', res.result.message, "error");
      }
      this.$emit('showSnackbar', '投票成功！', "success");
      this.$router.push(`/voteResult/${this.voteItem}`);
    }
  }
}
</script>
