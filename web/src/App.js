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
      name: "React",
      provider: null,
      web3: null,
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

    this.setState({
      provider: await this.state.web3Modal.connect(),
    })

    this.setState({
      web3: new Web3(this.state.provider),
    })

  }

  componentDidMount() {
  }

  render = () => {
    const { name } = this.state;

    return (
      <div className="App">
        <Layout>
          <div>{name}</div>
          <Header>
            <Button type="primary" onClick={this.onConnect}>Connect Wallet</Button>
          </Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
