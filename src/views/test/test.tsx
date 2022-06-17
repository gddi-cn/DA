
import './test.module.less'
import FabricCanvas from '@src/components/DataSetVisual/FabricCanvas'
import { useEffect } from 'react'

const Test = (props:any):JSX.Element => {
  console.log(props)
  useEffect(() => {
    const dp:{
      [index: string]: boolean
    } = {

    }
    const str = '"uyjswxastuxsmaqmqwlwftpyyqtkqnchtxktvfxcrdyyxpmoavmfrsxfzvtaqerqucblrcsunnhyfalunvptqqeqqdgchneaolymeurjzwvefqlgncikrfudqudbwvcilmyavughvnfnrfndyqlzdjckjxyhpaquaaauwbufpgyuwlnuzwlegcvjgpqgdrmtcgqcqyerriohnjaxmzpchoihjxuqlurummdutrgtbbpogqlcwdsxlrwgznyrnoohmstfxwxxwxftsmhoonrynzgwrlxsdwclqgopbbtgrtudmmurulquxjhiohcpzmxajnhoirreyqcqgctmrdgqpgjvcgelwzunlwuygpfubwuaaauqaphyxjkcjdzlqydnfrnfnvhguvaymlicvwbduqdufrkicnglqfevwzjruemyloaenhcgdqqeqqtpvnulafyhnnuscrlbcuqreqatvzfxsrfmvaompxyydrcxfvtkxthcnqktqyyptfwlwqmqamsxutsaxwsjyu"'
    const len = str.length
    let max = 0
    let res = ''
    for (let p = 0; p < len; p++) {
      for (let i = 0; i + p < len; i++) {
        const j = i + p

        if (i === j) {
          dp[i + '-' + j] = true
        } else if (i + 1 === j && str[i] === str[j]) {
          dp[i + '-' + j] = true
        } else if (i + 1 === j && str[i] !== str[j]) {
          dp[i + '-' + j] = false
        } else {
          if (dp[(i + 1) + '-' + (j - 1)] === true && str[i] === str[j]) {
            dp[i + '-' + j] = true
          } else {
            dp[i + '-' + j] = false
          }
        }

        if (dp[i + '-' + j] && j - i >= max) {
          max = j - i + 1

          res = str.substr(i, max)
        }
      }
    }
    console.log(max)
    console.log(res)
    console.log(dp)
  }, [])
  return (
    <div styleName='test'>
      <FabricCanvas data={[]} url="http://s3.ceph.k8s.gddi.com/storage-0l6qoa/2021/04/25/09455a12a6e3c6d805ebc769b04a9d987eb07aa1.jpg"/>
    </div>
  )
}

export default Test
