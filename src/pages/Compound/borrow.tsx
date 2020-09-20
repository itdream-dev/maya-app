import React, { useState } from 'react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import { CustomBorrowTable } from '../../components/Custom/CustomBorrowTable'
import styled from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/x.svg'
import { CustomBorrowModal } from '../../components/Modal/CustomBorrowModal'
import Modal from '../../components/Modal'
import { Wrapper } from '../../components/swap/styleds'
import { useActiveWeb3React } from '../../hooks'
import { useWalletModalToggle } from '../../state/application/hooks'
import { ButtonLight } from '../../components/Button'
import { useTokenBalances, useTokenGetBorrowAPYS, useTokenGetCollateralEnabled, useTokenGetborrowBalanceCurrent } from '../../state/compound/hooks'
import tokenInfo from '../../constants/tokenlist.json'
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

export default function Borrow() {
  const [modalOpen, setModalOpen] = useState(false);

  const [{ selected_token_address, selected_ctoken_address }, setSelectedToken] = useState<{
    selected_token_address: string | undefined
    selected_ctoken_address: string | undefined
  }>({
    selected_token_address: undefined,
    selected_ctoken_address: undefined
  })

  const closeModal = () => {
    setModalOpen(false);
  }

  const { account } = useActiveWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  
  const borrowapys = useTokenGetBorrowAPYS(tokenInfo.tokens)[0];  
  const collateral_enables = useTokenGetCollateralEnabled(tokenInfo.tokens)[0];
  const account_address = account? account : '0x5aBEa23Ea6F53B1D5022e43816407A094ba2d774';
  const token_balances = useTokenBalances(account_address, tokenInfo.tokens);  
  const borrowBalances = useTokenGetborrowBalanceCurrent(account_address, tokenInfo.tokens)[0];  

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
        <SwapPoolTabs active={'borrow'} />
        {!account ? (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
        ) : (
        <CustomBorrowTable
          data={tokenInfo.tokens}       
          borrowapys = {borrowapys}   
          collateral_enables = {collateral_enables}
          token_balances = {token_balances}
          borrowBalances = {borrowBalances}
          type = {"borrow"}
          cols1={[
            {title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 }},
            {title: 'APY/Accrued', style: { width: 160 }},
            {title: 'Balance', style: { width: 160 }},            
          ]}
          cols2={[
            {title: 'Asset', style: { textAlign: 'left', paddingLeft: 18 }},
            {title: 'APY', style: { width: 160 }},
            {title: 'Wallet', style: { width: 160 }},            
          ]}
          unit={'USDC'}
          header_img={'asset_USDC.svg'}
          header_title={'USD Coin'}
          onClickItem={(token: any) => showModal(token)}
        />)}
        <Modal isOpen={modalOpen} onDismiss={()=>setModalOpen(false)} minHeight={false} >
          <Wrapper>{getModalContent(
            null,
            <CustomBorrowModal selected_token_address={selected_token_address} selected_ctoken_address={selected_ctoken_address} borrowapys={borrowapys} token_balances={token_balances} borrowBalances={borrowBalances}/>)}
          </Wrapper>
        </Modal>
      </AppBody>
    </>
  )
}
