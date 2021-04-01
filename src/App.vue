<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>音乐投票</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item class="px-2">
        <v-img contain class="my-2" src="./assets/hzgeek-logo.png" @click="openHzgeek"></v-img>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/write/new-article">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Write an Article</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <transition name="fade">
        <router-view @showSnackbar="snackbar"></router-view>
      </transition>
      <v-fab-transition>
        <v-btn color="pink" dark bottom right fab fixed v-show="btnFlag" @click="backTop">
          <v-icon>mdi-arrow-up-thick</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-snackbar
        timeout="2000"
        :value="theSnackbar.isOpened"
        :color="theSnackbar.color"
      >{{theSnackbar.content}}</v-snackbar>
    </v-main>

    <v-footer color="primary lighten-1" padless inset app absolute>
      <v-row justify="center" no-gutters>
        <v-btn color="white" text rounded class="my-2" to="about">关于我们</v-btn>
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
          href="https://joinus.hz-geek.org"
          target="_blank"
        >加入我们</v-btn>
        <v-btn
          color="white"
          text
          rounded
          class="my-2"
          href="https://space.bilibili.com/155369896"
          target="_blank"
        >作者B站</v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>衡中极客圈</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    theSnackbar: {
      isOpened: false,
      color: 'info',
      content: 'This is a snackbar.'
    },
    btnFlag: false,
  }),
  methods: {
    openHzgeek: function () { window.open('https://joinus.hz-geek.org') },
    snackbar: function (content, clolor) {
      this.theSnackbar.content = content;
      this.theSnackbar.color = clolor;
      this.theSnackbar.isOpened = Math.random();
    },
    backTop: function () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    scrollToTop: function () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) that.btnFlag = true
      else that.btnFlag = false
    },
  },
  mounted: function () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
}
</script>
