import './App.css';
import styled from 'styled-components/macro';
import React, { Component, useEffect } from 'react';
import update from 'react-addons-update';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useParams,
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { message } from 'antd';
import moment from 'moment';
import queryString from 'query-string';
import FourOhFour from './containers/common/FourOhFour';
import { useIsSmallScreen } from './containers/common/responsiveComponents';
import Footer from './containers/common/Footer';
import Header from './containers/common/Header';
import AppContext from './AppContext';
import LandingPage from './containers/LandingPage/LandingPage';
import config from './config';
import CoinPage from './containers/CoinPage/CoinPage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: rgba(232, 230, 227, 0.85);
  background-color: #181a1b;
  ${({ isMobile }) => isMobile && 'overflow-x: hidden;'}
  max-width: 100%;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  padding-top: 64px;
  min-height: 100vh;
`;

const AppWrapper = withRouter(({ children }) => {
  const { isTabletOrMobile } = useIsSmallScreen();
  return (
    <AppContainer isMobile={isTabletOrMobile}>
      <Header />
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
    };
  }

  setCryptoData = (data) => {
    // const newObj = data.data.map((e) => ({
    //   checked: false,
    //   graphData: [e.quote.USD],
    //   ...e,
    // }));

    this.setState({
      cryptoData: data.data,
    });
  };

  setMetaData = (data) => {
    // const newObj = data.data.map((e) => ({
    //   checked: false,
    //   graphData: [e.quote.USD],
    //   ...e,
    // }));
    const arr = Object.values(data.data);
    this.setState({
      metaData: arr,
      loading: false,
    });
  };

  getCryptoData = () => {
    fetch(
      `${config.API_ENDPOINT}listings/latest?CMC_PRO_API_KEY=${config.API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
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

  // checkGraph = (id) => {
  //   // 1. Make a shallow copy of the items
  //   const items = [...this.state.cryptoData];
  //   // 2. Make a shallow copy of the item you want to mutate
  //   const item = { ...items[id - 1] };
  //   // 3. Replace the property you're intested in
  //   item.checked = !item.checked;
  //   // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
  //   items[id - 1] = item;
  //   // 5. Set the state to our new copy
  //   this.setState({ cryptoData: items });

  //   console.log(this.state.cryptoData);
  // };

  setGraphData = (data) => {
    const timeSeries = data['Time Series (Digital Currency Daily)'];
    const dateKeys = Object.keys(data['Time Series (Digital Currency Daily)']);
    const graphArray = [];
    let graphObj = {};
    for (let i = 0; i < 50; i++) {
      graphObj = {
        price: parseFloat(timeSeries[dateKeys[i]]['4b. close (USD)']),
        date: moment(dateKeys[i]).format('MM/DD'),
      };
      graphArray.push(graphObj);
    }
    this.setState({
      graphData: graphArray.reverse(),
      loading: false,
    });
  };

  componentDidMount = () => {
    this.getCryptoData();
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
        message.error(`Please try again later: ${err}`);
      });
  };

  getMetaData = () => {
    const symbolList = this.state.cryptoData.map((item) => item.symbol);
    fetch(
      `${config.META_ENDPOINT}symbol=${symbolList}&CMC_PRO_API_KEY=${config.API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setMetaData)
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
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
    };
    console.log(this.state.metaData);
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
