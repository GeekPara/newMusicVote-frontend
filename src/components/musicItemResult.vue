<template>
  <v-container>
    <v-card elevation="4">
      <v-card-title>
        <span class="float-left">{{title}} - {{artist}}</span>
        <v-spacer />
        <span class="float-right">{{vote}}票</span>
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
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['title', 'add-by', 'artist', 'music-id', 'vote-item', 'vote'],
  data: function () {
    return {
      buttonText: '投票',
      count: 0,
      links: {
        kugou: 'https://www.baidu.com',
        qq: 'https://www.baidu.com',
        netease: 'https://www.baidu.com'
      }
    }
  },
}
</script>
