<template>
  <div>
    <v-navigation-drawer
    v-model="menuVisible"
    temporary
    app
    >
      <v-list class="pt-0" dense>
        <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
        :href="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
    fixed
    app
    >
      <v-toolbar-side-icon
      @click="menuVisible = !menuVisible"
      >
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="title">mobcards</span>
        <span class="subheading font-weight-thin font-italic hidden-xs-only"> - play against humanity anywhere!</span>
      </v-toolbar-title>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      menuVisible: false,
      menuItems: [
      {
        icon: 'insert_chart',
        title: 'Stats',
        link: 'stats'
      },
      {
        icon: 'exit_to_app',
        title: 'Leave game',
        link: '/'
      },
      {
        icon: 'info',
        title: 'Help',
        link: 'cards'
      }
    ]
    }
  }
}
</script>