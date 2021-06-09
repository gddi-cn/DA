
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import core from './controller/core';
import { Provider } from 'react-redux';
import ErrorBoundaries from './views/container/ErrorBoundaries'
import { ConnectedRouter } from 'connected-react-router'
import { renderRoutes } from 'react-router-config'
import routes, { history } from './router'
import './asset/style/appCustom.less'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <React.StrictMode>
      <Provider store={core}>
        <ConnectedRouter history={history} >
          <ErrorBoundaries>
            {renderRoutes(routes)}
          </ErrorBoundaries>
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  </ConfigProvider>,
  document.getElementById('root')
);
