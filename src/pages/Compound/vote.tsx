import React from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'
import styled from 'styled-components'

const Box = styled.div`
font-size: 60px;
text-align: center;
margin: 30vh 0;
color: #202c2d;
background: #FFFFFF;
text-shadow: 0 1px #808d93, -1px 0 #cdd2d5, -1px 2px #808d93, -2px 1px #cdd2d5, -2px 3px #808d93, -3px 2px #cdd2d5, -3px 4px #808d93, -4px 3px #cdd2d5, -4px 5px #808d93, -5px 4px #cdd2d5, -5px 6px #808d93, -6px 5px #cdd2d5, -6px 7px #808d93, -7px 6px #cdd2d5, -7px 8px #808d93, -8px 7px #cdd2d5;
`

export default function Vote() {
  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  
  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'vote'} />
        <Wrapper id="vote-page">
          <Box>Coming soon!</Box>
        </Wrapper>
      </AppBody>
    </>
  )
}
