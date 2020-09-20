import React, { } from 'react';
import styled from 'styled-components';

const Button = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  color: white;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
  margin-top: 20px;
  &:hover {
    cursor: pointer
  }
`

export const CustomBtn = (props: any) => {
  return (
    <Button color={props.color} onClick={() => props.buttonClick()}>{props.title}</Button>
  )
}
