import React from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'

export default function Vote() {
  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'vote'} />
        <Wrapper id="vote-page">Coming soon!</Wrapper>
      </AppBody>
    </>
  )
}
