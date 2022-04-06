
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import core from './controller/core';
import { Provider } from 'react-redux';
// import ErrorBoundaries from './views/container/ErrorBoundaries'

import { BrowserRouter } from 'react-router-dom';
import Routes from './router'
import './asset/style/appCustom.less'

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ConfigProvider locale={zhCN}>

      <Provider store={core}>

        <BrowserRouter>

          <Routes />

        </BrowserRouter>

      </Provider>

    </ConfigProvider>
  );
