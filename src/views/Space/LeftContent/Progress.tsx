import styled from 'styled-components'

const Progress = styled.div<{progress: number}>`
  height: 10px;
  width: 100%;
  border-radius: 8px;
  background-color: #D3E9F9;
  position: relative;
  &:before {
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    display: block;
    position: absolute;
    width: ${props => props.progress + '%'};
    background-color: #48A2DF;
    border-radius: 8px;
  }
`

export default Progress
