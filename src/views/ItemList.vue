<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <v-card elevation="2">
          <v-card-title>请选择您要投票的项目</v-card-title>
          <v-card-subtitle>尚未开始的项目未在列表中显示</v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item v-for="item in items" :key="item.title" :to="`/voteItem/${item.id}`">
                <v-list-item-icon v-if="$vuetify.breakpoint.mdAndUp">
                  <v-icon>mdi-music-box-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{item.name}}</v-list-item-title>
                  <v-list-item-subtitle>截至{{item.end}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer />
                <v-chip class="ma-2" color="red" text-color="white" v-if="item.isEnded">已结束</v-chip>
                <v-list-item-icon>
                  <v-icon>mdi-chevron-right-circle</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      token:sessionStorage.getItem('token'),
      sid:sessionStorage.getItem('sid'),
      selectedItem: 1,
      items: [],
    }
  },
  created: async function () {
    let res = await this.tcb.callFunction({
      name: 'get-list',
      data: {
        token: this.token,
        sid: this.sid
      },
      parse: true
    })
    if (res.code) {
      console.error(`TCB Error: ${res.code} Message: ${res.message} requestId: ${res.requestId}`);
      return this.$emit('showSnackbar', "服务器内部错误，请稍后再试", "error");
    }
    if (!res.result.status) {
      console.error(`Login Error: sid: ${this.sid} requestId: ${res.requestId}`);
      this.$emit('showSnackbar', res.result.message, "error");
      return this.$router.push('/');
    }
    if (res.result.data.length == 1) {
      return this.$router.push(`/voteItem/${res.result.data[0].id}`);
    }
    this.items = res.result.data;
  }
}
</script>
