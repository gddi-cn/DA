import styled from 'styled-components'

const ListContainer = styled.div`
  //display: flex;
  //flex-wrap: wrap;
  //gap: 16px;
  display: grid;
  grid-gap: 18px;
  
  @media only screen and (min-width: 1800px) {
    grid-template: auto/repeat(8, 1fr);
  }
  
  @media only screen and (min-width: 1700px) and (max-width: 1799px) {
    grid-template: auto/repeat(7, 1fr);
  }

  @media only screen and (min-width: 1536px) and (max-width: 1699px) {
    grid-template: auto/repeat(6, 1fr);
  }

  @media only screen and (min-width: 1440px) and (max-width: 1535px) {
    grid-template: auto/repeat(6, 1fr);
  }

  @media only screen and (min-width: 1200px) and (max-width: 1439px) {
    grid-template: auto/repeat(5, 1fr);
  }

  @media only screen and (min-width: 100px) and (max-width: 1199px) {
    grid-template: auto/repeat(4, 1fr);
  }
  
  @media only screen and (min-width: 700px) and (max-width: 999px) {
    grid-template: auto/repeat(3, 1fr);
  }
  
  @media only screen and (min-width: 600px) and (max-width: 699px) {
    grid-template: auto/repeat(2, 1fr);
  }

`

export default ListContainer
