import React from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { Layout, Button } from 'antd';
import supportedChains from './chains'
import './App.css';

const { Header, Footer, Content } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chainId: 1,
      provider: null,
      web3: null,
      networkId: '',
      currAddress: '',
    }

    this.state.web3Modal = new Web3Modal({
      // network: this.getNetwork(), // optional
      cacheProvider: true,
      providerOptions: this.getProviderOptions()
    });

  }

  getChainData = (chainId) => {
    const chainData = supportedChains.filter(
      (chain) => chain.chain_id === chainId
    )[0];

    return chainData;
  }

  getNetwork = () => this.getChainData(this.state.chainId).network;

  getProviderOptions = () => {
    const providerOpts = {
      // walletconnect: {
      //   package: WalletConnectProvider,
      //   options: {
      //     infuraId: process.env.REACT_APP_INFURA_ID
      //   }
      // }
    };

    return providerOpts;
  };

  onConnect = async () => {

    const provider = await this.state.web3Modal.connect()
    const web3 = new Web3(provider)

    const accounts = await web3.eth.getAccounts();
    const currAddress = accounts[0];
    const networkId = await web3.eth.net.getId();
    // const chainId = await localWeb3.eth.chainId();
    console.log("currAddress :", currAddress);

    await this.setState({
      provider,
      web3,
      networkId,
      currAddress,
    })
  }

  componentDidMount() {
    if (this.state.web3Modal.cachedProvider) {
      this.onConnect();
    }
  }

  render = () => {
    const {networkId, currAddress } = this.state;

    return (
      <div className="App">
        <Layout>
          <Header>
            <Button type="primary" onClick={this.onConnect}>Connect Wallet</Button>
            <Button>NetworkId: {networkId}</Button>
            <Button>Addr: {currAddress}</Button>
          </Header>
          <Content><div>Content</div></Content>
          <Footer><div>Footer</div></Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
