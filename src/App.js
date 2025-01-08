import './App.css';
import styled from 'styled-components/macro';
import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { message } from 'antd';
import moment from 'moment';
import FourOhFour from './containers/common/FourOhFour';
import { useIsSmallScreen } from './containers/common/responsiveComponents';
import Footer from './containers/common/Footer';
import Header from './containers/common/Header';
import AppContext from './AppContext';
import LandingPage from './containers/LandingPage/LandingPage';
import config from './config';
import CoinPage from './containers/CoinPage/CoinPage';
import GlobalMetrics from './containers/common/GlobalMetrics';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto,
    Helvetica, Arial, sans-serif;

  min-height: 100vh;
  color: rgba(232, 230, 227, 0.85);
  background-color: rgb(23, 25, 25);
  ${({ isMobile }) => isMobile && 'overflow-x: hidden;'}
  max-width: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  min-height: 100vh;
`;

const AppWrapper = withRouter(({ children }) => {
  const { isTabletOrMobile } = useIsSmallScreen();
  return (
    <AppContainer isMobile={isTabletOrMobile}>
      <Header />
      <GlobalMetrics />
      <ContentContainer>{children}</ContentContainer>
      <Footer />
    </AppContainer>
  );
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoData: [],
      loading: true,
      graphData: [],
      metaData: [],
      globalMetric: [],
      searchNames: [],
      error: false,
    };
  }

  setCryptoData = (data) => {
    const names = data.data.map((e) => ({
      name: e.name,
      symbol: e.symbol,
    }));
    this.setState({
      cryptoData: data.data,
      searchNames: names,
    });
  };

  setGlobalMetric = (data) => {
    this.setState({
      globalMetric: data.data,
    });
  };

  setMetaData = (data) => {
    const arr = Object.values(data.data);
    this.setState({
      metaData: arr,
      loading: false,
    });
  };

  getCryptoData = () => {
    fetch(`${config.API_ENDPOINT}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setCryptoData)
      .then(this.getMetaData)
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  setGraphData = (data) => {
    const timeSeries = data['Time Series (Digital Currency Daily)'];
    const dateKeys = Object.keys(timeSeries); // Get the date keys
    const graphArray = [];
  
    for (let i = 0; i < dateKeys.length; i++) {
      const graphObj = {
        price: parseFloat(timeSeries[dateKeys[i]]['4. close']), // Use correct key for closing price
        date: moment(dateKeys[i]).format('MM/DD'), // Format date as MM/DD
      };
      graphArray.push(graphObj);
    }
  
    this.setState({
      graphData: graphArray.reverse(), // Reverse to show earliest date first
      loading: false,
    });
  };
  

  componentDidMount = () => {
    this.getCryptoData();
    this.getGlobalMetrics();
  };

  getGraph = (item) => {
    fetch(
      `${config.GRAPH_ENDPOINT}symbol=${item}&market=USD&apikey=${config.GRAPH_KEY}`,
      {
        method: 'GET',
        headers: {},
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setGraphData)
      .catch((err) => {
        this.setState({ error: true });
      });
  };
  getMetaData = (list) => {
    const symbolList = this.state.cryptoData.map((item) => item.symbol).join(',') || list;
    fetch(`${config.META_ENDPOINT}?symbols=${symbolList}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setMetaData)
      .catch((err) => {
        message.error(`Failed to fetch metadata: ${err}`);
      });
  };

  getGlobalMetrics = () => {
    fetch(`${config.GLOBAL_METRIC}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setGlobalMetric)
      .catch((err) => {
        message.error(`Failed to fetch global metrics: ${err}`);
      });
  };

  render() {
    const contextValues = {
      cryptoData: this.state.cryptoData || [],
      checkGraph: this.checkGraph,
      loading: this.state.loading,
      graphData: this.state.graphData,
      getGraph: this.getGraph,
      metaData: this.state.metaData,
      getCryptoData: this.getCryptoData,
      config: config,
      getMetaData: this.getMetaData,
      error: this.state.error,
      globalMetric: this.state.globalMetric,
      searchNames: this.state.searchNames,
    };
    return (
      <AppContext.Provider value={contextValues}>
        <>
          <Router>
            <QueryParamProvider ReactRouterRoute={Route}>
              <AppWrapper>
                <Switch>
                  <Route exact path="/">
                    <LandingPage />
                  </Route>
                  <Route path="/coin/:symbol">
                    <CoinPage />
                  </Route>

                  <Route>
                    <FourOhFour />
                  </Route>
                </Switch>
              </AppWrapper>
            </QueryParamProvider>
          </Router>
        </>
      </AppContext.Provider>
    );
  }
}

export default App;
