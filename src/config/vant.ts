import { App } from 'vue';
import { Button, Cell, CellGroup, Empty, Icon, Loading, NavBar, Overlay, Popup } from 'vant';

const vantPlugin = {
  install: (app: App<any>): any => {
    app.use(Button).use(Cell).use(CellGroup).use(Empty).use(Icon).use(Loading).use(NavBar).use(Overlay).use(Popup);
  },
};

export default vantPlugin;
