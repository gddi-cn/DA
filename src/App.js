import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { StepForwardOutlined } from '@ant-design/icons';
import './app.less'

function App () {
  const [a, seta] = useState('1')
  useEffect(() => {
    const a = { b: 1 }
    console.log(a.a ?? 2);
    seta(a.a ?? 5);
  }, [])

  return (
    <div styleName="app">
      <div className='title'>
        <Button type='primary'>测{a}试11111<StepForwardOutlined /></Button>

      </div>
    </div>
  );
}

export default App;
