import React, { useEffect, useState } from 'react'

function App () {
  const [a, seta] = useState('1')
  useEffect(() => {
    const a = { b: 1 }
    console.log(a.a ?? 2);
    seta(a.a ?? 5);
  }, [])

  return (
    <div className="App">
      {a}1a1aaaasdasd123
    </div>
  );
}

export default App;
