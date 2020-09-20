import React, { useState } from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { Wrapper } from '../../components/swap/styleds'
import styled from 'styled-components'
import { CustomSupplyTable } from '../../components/Custom/CustomSupplyTable'
import Modal from '../../components/Modal'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { CustomSupplyModal } from '../../components/Modal/CustomSupplyModal'
import { CustomCollateralRequiredModal } from '../../components/Modal/CustomCollateralRequiredModal'
import { CustomCollateralEnabledModal } from '../../components/Modal/CustomCollateralEnabledModal'
import { useActiveWeb3React } from '../../hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import { ButtonLight } from '../../components/Button'
import tokenInfo from '../../constants/tokenlist.json'
import { useTokenBalances, useTokenGetSupplyAPYS, useTokenGetCollateralEnabled, useTokenGetbalanceOfUnderlying } from '../../state/compound/hooks'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 18px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
` 

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg2};
  // padding: 2rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
`

const UpperSection = styled.div`
  width: 420px;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`

export default function Supply() {
  const [modalOpen, setModalOpen] = useState(false);
  const [collaterialE, setCollaterialE] = useState(false);
  const [collaterialR, setCollaterialR] = useState(false);  
  
  const [{ selected_token_address, selected_ctoken_address }, setSelectedToken] = useState<{
    selected_token_address: string | undefined
    selected_ctoken_address: string | undefined
  }>({
    selected_token_address: undefined,
    selected_ctoken_address: undefined
  })

  const { account } = useActiveWeb3React()  

  const toggleWalletModal = useWalletModalToggle()

  const closeModal = () => {
    setModalOpen(false);
    setCollaterialE(false);
    setCollaterialR(false);
  }

  const collaterialModal = (x: boolean) => {
     if(x) {
      setCollaterialR(true);
     } else {
      setCollaterialE(true);
     }
  }

  const supplyapys = useTokenGetSupplyAPYS(tokenInfo.tokens)[0];  
  const collateral_enables = useTokenGetCollateralEnabled(tokenInfo.tokens)[0];
  const account_address = account? account : '0x5aBEa23Ea6F53B1D5022e43816407A094ba2d774';
  const token_balances = useTokenBalances(account_address, tokenInfo.tokens);  
  const underlying_balances = useTokenGetbalanceOfUnderlying(account_address, tokenInfo.tokens)[0];

  function getModalContent(header: any, content: any) {
    return (
      <UpperSection>
        <CloseIcon onClick={closeModal}>
          <CloseColor />
        </CloseIcon>
        {header}
        <ContentWrapper>
          {content}
        </ContentWrapper>
      </UpperSection>
    )
  }
  
  const showModal = (token: any) => {
    console.log('token clicked', token);
    setSelectedToken({selected_token_address: token.address, selected_ctoken_address:token.ctoken_address});        
    setModalOpen(true);
  }

  return (
    <>
      <AppBody>
        <SwapPoolTabs active={'supply'} />
        <Wrapper id="supply-page"></Wrapper>
        {!account ? (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
        ) : (
        <CustomSupplyTable
          data={tokenInfo.tokens}       
          supplyapys = {supplyapys}   
          collateral_enables = {collateral_enables}
          token_balances = {token_balances}          
          underlying_balances = {underlying_balances}
          type = {"supply"}
          cols1={[
            { title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 } },
            { title: 'APY/Earned', style: { width: 160 } },
            { title: 'Balance', style: { width: 160 } },
            { title: 'Collateral', style: { width: 120 } },
          ]}
          cols2={[
            { title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 } },
            { title: 'APY', style: { width: 160 } },
            { title: 'Wallet', style: { width: 160 } },
            { title: 'Collateral', style: { width: 120 } },
          ]}
          onClickItem={(token: any) => showModal(token)}
          modalCollaterial={(x: boolean) => collaterialModal(x)}
        />)}
        <Modal isOpen={modalOpen} onDismiss={()=>setModalOpen(false)} minHeight={false} >
          <Wrapper>{getModalContent(
            null,
            <CustomSupplyModal selected_token_address={selected_token_address} selected_ctoken_address={selected_ctoken_address} supplyapys={supplyapys} token_balances={token_balances} underlying_balances={underlying_balances}/>)}
          </Wrapper>
        </Modal>

        <Modal isOpen={collaterialE} onDismiss={()=>setCollaterialE(false)} minHeight={false}>
          <Wrapper>
            {getModalContent(null, <CustomCollateralEnabledModal/>)}
          </Wrapper>
        </Modal>

        <Modal isOpen={collaterialR} onDismiss={()=>setCollaterialR(false)} minHeight={false}>
          <Wrapper>
            {getModalContent(null, <CustomCollateralRequiredModal/>)}
          </Wrapper>
        </Modal>
      </AppBody> 
    </>
  )
}

// const mokeData = [
//   { id: 1, img: 'asset_BAT.svg', unit: 'BAT', title: 'Basic Attention', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0.09, balance_eth: 0.4271, collateral: true },
//   { id: 2, img: 'asset_COMP.svg', unit: 'COMP', title: 'COMP', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0.25, balance_eth: 0.4271, collateral: false },
//   { id: 3, img: 'asset_DAI.svg', unit: 'DAI', title: 'Dai', earned_percent: 0.06, earned_eth: 0.0027, balance_dollar: 0.13, balance_eth: 0.9271, collateral: false },
//   { id: 4, img: 'asset_ETH.svg', unit: 'ETH', title: 'ETH', earned_percent: 0.86, earned_eth: 0.0037, balance_dollar: 0.23, balance_eth: 0.4271, collateral: true },
//   { id: 5, img: 'asset_REP.svg', unit: 'REP', title: 'Wrapped BTC', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
//   { id: 6, img: 'asset_SAI.svg', unit: 'SAI', title: '0x Protocol Tok', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
//   { id: 7, img: 'asset_USDC.svg', unit: 'USDC', title: 'USDC', earned_percent: 0.42, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
//   { id: 8, img: 'asset_USDT.svg', unit: 'USDT', title: 'Tether', earned_percent: 0.86, earned_eth: 0.0027, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
//   { id: 9, img: 'asset_ZRX.svg', unit: 'ZRX', title: 'ZRX', earned_percent: 0.86, earned_eth: 0.0022, balance_dollar: 0, balance_eth: 0.4471, collateral: true },
// ]