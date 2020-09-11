
import React from 'react'

import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
export default function Borrow() {

  



  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode


  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'borrow'} />
      </AppBody>      
    </>
  )
}
