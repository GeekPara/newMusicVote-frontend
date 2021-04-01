<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="2">
          <v-card-title class="font-weight-bold">
            {{itemInfo.title}}
            <v-spacer />
            <v-chip class="ma-2" color="red" text-color="white" v-if="itemInfo.isEnded">已结束</v-chip>
          </v-card-title>
          <v-card-subtitle>选择一首你喜欢的歌曲，为它投票吧。</v-card-subtitle>
          <v-card-text class="text-body-2">
            <ul style="color:black">
              <li>歌曲语言只能是中文普通话或英文，其中以中文为主</li>
              <li>歌词内容必须符合积极向上之主旨，杜绝低俗反动之内容</li>
              <li>
                午歌多用流行音乐，节奏明快、易于演唱。
                <strong>不建议添加说唱部分过多的、曲调过高的歌曲。</strong>
              </li>
              <li>
                不要恶意添加不当内容，
                <strong>你的姓名会显示在你所添加内容的旁</strong>
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
            @showSnackbar="snackbar"
          />
          <v-container>
            <v-card elevation="4">
              <v-card-title>
                <span class="float-left">没有喜欢的？添加一首！</span>
              </v-card-title>
              <v-card-subtitle>请不要添加列表中已有歌曲</v-card-subtitle>
              <v-card-text>
                <div class="ma-2">
                  <v-text-field label="歌曲标题" filled v-model="addMusic.title"></v-text-field>
                  <v-text-field label="歌手/作者" filled v-model="addMusic.artist"></v-text-field>
                  <v-btn color="light-blue" block @click="add">{{buttonText}}</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MusicItem from '../components/musicItem.vue';
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
      items: [
        { musicId: '123', title: '233', artist: '333', addBy: '444' },
        { musicId: '1234', title: '233', artist: '333', addBy: '444' },
        { musicId: '12345', title: '233', artist: '333', addBy: '444' }
      ],
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
      if (res.result.data.isVoted) return this.$router.push(`/voteResult/${this.itemId}`);
      this.itemInfo.title = res.result.data.name;
      this.itemInfo.isEnded = res.result.data.isEnded;
      this.itemInfo.end = res.result.data.end;
      this.items = res.result.data.musics;
    },
    snackbar: function (content, clolor) {
      this.$emit('showSnackbar', content, clolor);
    },
    add: async function () {
      if (!this.buttonCount) {
        this.buttonText = '仅一次机会，确定？';
        this.buttonCount += 1;
        return
      }
      let res2 = await this.tcb.callFunction({
        name: 'add-music',
        data: {
          token: sessionStorage.getItem('token'),
          sid: sessionStorage.getItem('sid'),
          voteItem: this.itemId,
          title: this.addMusic.title,
          artist: this.addMusic.artist
        },
        parse: true
      })
      if (res2.code) {
        console.error(`TCB Error: ${res2.code} Message: ${res2.message} requestId: ${res2.requestId}`);
        return this.$emit('showSnackbar', "服务器内部错误，请稍后再试", "error");
      }
      if (!res2.result.status) {
        console.error(`Vote Error: requestId: ${res2.requestId}`);
        this.buttonText = '添加出错，点击重试';
        return this.$emit('showSnackbar', res2.result.message, "error");
      }
      this.$emit('showSnackbar', '添加成功！', "success");
      this.$router.push(`/voteResult/${this.itemId}`);
    }
  },
  created: function () {
    this.reload();
  }
}
</script>
