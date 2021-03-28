<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="2">
          <v-card-title>请选择您要投票的项目</v-card-title>
          <v-card-subtitle>选择一首你喜欢的歌曲，为它投票吧。没有喜欢的？添加按钮在页面底部。</v-card-subtitle>
          <v-card-text class="text-body-2">
            <ul style="color:black">
              <li>歌曲语言只能是中文普通话或英文，其中以中文为主</li>
              <li>歌词内容必须符合积极向上之主旨，杜绝低俗反动之内容</li>
              <li>
                午歌多用流行音乐，节奏明快、易于演唱。
                <strong>不建议添加说唱部分过多的、曲调过高的歌曲。</strong>
              </li>
              <li>
                请勿恶意添加不当内容，
                <strong>你的姓名会显示在你所添加内容的旁边</strong>
              </li>
              <li>
                <strong>每次投票将按照票数排名从前往后选取歌曲，每周一换</strong>
              </li>
            </ul>
          </v-card-text>
          <v-expansion-panels accordion focusable>
            <v-expansion-panel v-for="item in items" :key="item.musicId">
              <v-expansion-panel-header>{{item.title}}-{{item.artist}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="ma-2">
                  <span class="mr-2">
                    <strong>由{{item.addBy}}添加</strong>
                  </span>
                  <span>搜索这首歌：</span>
                  <a href="https://www.baidu.com" target="_blank">
                    <v-avatar>
                      <v-img
                        src="https://www.kugou.com/yy/static/images/play/logo.png"
                        max-height="32"
                        max-width="32"
                      />
                    </v-avatar>
                  </a>
                  <a href="https://www.baidu.com" target="_blank">
                    <v-avatar>
                      <v-img src="https://y.qq.com/favicon.ico" max-height="32" max-width="32" />
                    </v-avatar>
                  </a>
                  <a href="https://www.baidu.com" target="_blank">
                    <v-avatar>
                      <v-img
                        src="https://s1.music.126.net/style/favicon.ico"
                        max-height="32"
                        max-width="32"
                      />
                    </v-avatar>
                  </a>
                  <v-btn color="light-blue" block>投票</v-btn>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      token: sessionStorage.getItem('token'),
      sid: sessionStorage.getItem('sid'),
      itemId: this.$route.params.id,
      items: [
        { musicId: '123', title: '233', artist: '333', addBy: '444' },
        { musicId: '1234', title: '233', artist: '333', addBy: '444' },
        { musicId: '12345', title: '233', artist: '333', addBy: '444' }
      ]
    }
  },
  created: async function () {
    let res = await this.tcb.callFunction({
      name: 'get-item',
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
      return this.$router.push('/');
    }

  }
}
</script>
