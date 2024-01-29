import '../src/index.css';

// Registers the new addon 新しいアドオンを登録する。
import { initialize,mswLoader } from 'msw-storybook-addon';

//Initialize MSW
initialize();

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {//通常、Storybook の機能とアドオンの動作を制御するために使用 アドオン：Storybookの設定を変更したり機能を追加したりするやつ
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
