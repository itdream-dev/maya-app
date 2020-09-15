import React, { } from 'react';
import styled from 'styled-components';

const CoinItem = styled.div<{ border: any }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 2px solid ${({ border }) => (border === 'transparent' ? 'transparent' : border === 'red' ? 'red' : '#EFF2F4')};
  padding: 16px 0;
  div {
    display: flex;  
    align-items: center;
    flex-direction: row;
    img {
      width: 28px;
      height: 28px;
      margin-right: 8px;
    }
    span {
      color: #aab8c1;
      font-size: 14px;
    }
  }
`

export const CustomCoinItem = (props: any) => {
  return (
    <CoinItem border={props.border}>
      <div>
        {props.logo && <img src={props.logo} alt={'logo'}></img>}
        <span>{props.title}</span>
      </div>
      <div>
        {props.value && <span>{props.value}</span>}
        {props.values && <span>{props.values[0]} <span style={{ color: '#00D395'}}>➜</span> {props.values[1]}</span>}
      </div>
    </CoinItem>
  )
}
