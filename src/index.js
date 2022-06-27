
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import core from './controller/core';
import { Provider } from 'react-redux';
import ErrorBoundaries from './views/container/ErrorBoundaries'

import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routes, { history } from './router'
import { cusTheme } from '@src/utils'
// antd动态主题的配置额
import 'antd/dist/antd.variable.min.css'

import './asset/style/appCustom.less'

// 自定义主题
cusTheme()

/* react 18 应该没啥大问题是吧 */

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ConfigProvider locale={zhCN}>

      <Provider store={core}>

        <HistoryRouter history={history}>
          <ErrorBoundaries>
            <Routes />
          </ErrorBoundaries>
        </HistoryRouter>

      </Provider>

    </ConfigProvider>
  );
