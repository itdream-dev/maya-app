import { Interface } from '@ethersproject/abi'
import COMPTROLLER_ABI from './comptroller.json'


const COMPTROLLER_INTERFACE = new Interface(COMPTROLLER_ABI)
export default COMPTROLLER_INTERFACE

