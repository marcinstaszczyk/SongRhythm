<template>
  <div id="app">
    <h1>Rhythm of songs from YouTube</h1>
    <YTRhythm/>
    <RhythmLine/>
    <RhythmControls/>
    <BooleanDialog ref="booleanDialog"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import YTRhythm from './components/YTRhythm.vue';
import RhythmLine from './components/RhythmLine.vue';
import RhythmControls from './components/RhythmControls.vue';
import BooleanDialog from './components/core/BooleanDialog.vue';

@Component({
  components: {
    YTRhythm,
    RhythmLine,
    RhythmControls,
    BooleanDialog,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 640px;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 20px;

  h1 {
    text-align: center;
  }
}

@font-face {
  font-family: 'FontAwesome';
  src: url('../node_modules/font-awesome/fonts/fontawesome-webfont.eot?v=4.7.0');
  src: url('../node_modules/font-awesome/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'), 
      url('../node_modules/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'), 
      url('../node_modules/font-awesome/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'), 
      url('../node_modules/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'), 
      url('../node_modules/font-awesome/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
  font-weight: normal;
  font-style: normal;
}

</style>
