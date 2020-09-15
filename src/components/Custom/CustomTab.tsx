import React, { } from 'react';
import styled from 'styled-components';

const TAB = styled.div<{ selected: boolean }>`
  display: flex;
  flex: 1;
  color: ${({ selected }) => (selected ? '#00D395' : 'grey')};
  border-bottom: 3px solid ${({ selected }) => (selected ? '#00D395' : 'transparent')};
  font-size: 12px;
  font-weight: 500;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer
  }
`

export const CustomTab = (props: any) => {
  return (
    <div style={{ display: 'flex' }}>
      <TAB selected={props.selected} onClick={() => props.tabClick(true)}>{props.title1}</TAB>
      <TAB selected={!props.selected} onClick={() => props.tabClick(false)}>{props.title2}</TAB>
    </div>
  )
}
