<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Smartcards</span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Choose wisely</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="menuVisible = !menuVisible">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-button v-bind:href="'#/stats'">
            <md-list-item>
              <md-icon>insert_chart</md-icon>
              <span class="md-list-item-text">Stats</span>
            </md-list-item>
          </md-button>

          <md-button v-bind:href="'#/'">
            <md-list-item>
              <md-icon>exit_to_app</md-icon>
              <span class="md-list-item-text">Leave game</span>
            </md-list-item>
          </md-button>

          <md-button v-bind:href="'#/cards'">
            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text">Help</span>
            </md-list-item>
          </md-button>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="css" scoped>
.md-app {
  border: 1px solid rgba(#000, .12);
  min-height: 500px;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

<script>
export default {
  name: 'App',
  data: () => ({
    menuVisible: false
  })
}
</script>
