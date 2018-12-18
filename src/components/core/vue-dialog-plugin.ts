import Vue from 'vue';
import BooleanDialog from './BooleanDialog.vue';

declare module 'vue/types/vue' {
  interface Vue {
    $dialogAsk(message: string, yesText?: string, noText?: string): Promise<boolean>;
    $dialogConfirm(message: string, yesText?: string, noText?: string): Promise<void>;
  }
}

export const VueDialogPlugin = {
  install() {
    Vue.prototype.$dialogAsk = function(message: string, yesText = '', noText = '') {
      const vue: Vue = this;
      const dialog = vue.$root.$children[0].$refs.booleanDialog as BooleanDialog;
      return dialog.ask(message, yesText, noText);
    };
    Vue.prototype.$dialogConfirm = function(message: string) {
      const vue: Vue = this;
      const dialog = vue.$root.$children[0].$refs.booleanDialog as BooleanDialog;
      return dialog.confirm(message);
    };
  },
};
