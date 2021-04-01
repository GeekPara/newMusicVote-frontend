<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-card elevation="2">
          <v-card-title>请完成登录验证</v-card-title>
          <v-card-subtitle>以确认投票者的身份</v-card-subtitle>
          <v-card-text>
            <v-text-field
              label="唯一号"
              hint="即小鑫作业的登录账号"
              placeholder="21900000"
              v-model="g_sid"
              filled
            ></v-text-field>
            <v-text-field
              label="学号"
              hint="旧学号（高二下学期期二调考前学号）"
              placeholder="19000000"
              v-model="g_studyId"
              filled
              @keyup.enter="submit"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="light-blue" large block @click="submit">提交</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function () {
    return {
      g_sid: null,
      g_studyId: null
    }
  },
  methods: {
    submit: async function () {
      this.$emit('showSnackbar', "请稍候...", "info");
      let res = await this.tcb.callFunction({
        name: 'login-auth',
        data: {
          g_sid: this.g_sid,
          g_studyId: this.g_studyId
        },
        parse: true
      })
      if (res.code) {
        console.error(`TCB Error: ${res.code} Message: ${res.message} requestId: ${res.requestId}`);
        return this.$emit('showSnackbar', "服务器内部错误，请稍后再试", "error");
      }
      if (!res.result.status) {
        console.error(`Login Error: sid: ${this.g_sid} studyId: ${this.g_studyId} requestId: ${res.requestId}`);
        return this.$emit('showSnackbar', "验证失败，请检查填写是否有误", "error");
      }
      this.$emit('showSnackbar', "验证成功", "success");
      sessionStorage.setItem("sid", res.result.data.sid);
      sessionStorage.setItem("token", res.result.data.token);
      sessionStorage.setItem("stuName", res.result.data.name);
      this.$router.push('/itemList')
    }
  }
}
</script>
