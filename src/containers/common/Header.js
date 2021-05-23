import styled from 'styled-components/macro';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { DesktopOnly, MobileOnly } from './responsiveComponents';
import 'antd/dist/antd.css';
import '../../App.css';

const AppHeaderContainer = styled.div`
  padding: 8px 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 60px;
  width: 100vw;
  z-index: 99;
  /*background-color: #ff294a;*/
  color: #fff;
  background-color: rgb(27, 29, 30);
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  color: #fff;
`;

const HeaderContentContainer = styled.div`
  font-weight: 500;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

// const StyledHeader = styled.h3`
//   color: #fff;
//   margin-bottom: 0;
//   :hover {
//     color: #1890ff;
//   }
// `;

const StyledTitle = styled.h2`
  color: #fff;
  margin-bottom: 0;
  letter-spacing: 3px;
`;

const LogoLink = styled(Link)`
  justify-self: center;
  align-self: center;
  color: #364966;
  font-size: 15px;
`;

export default function Header() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <AppHeaderContainer>
      <DesktopOnly>
        <HeaderContentContainer>
          <HeaderSection
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingLeft: 10,
            }}
          >
            <LogoLink to="/">
              <StyledTitle>CryptoTrack</StyledTitle>
            </LogoLink>{' '}
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }} />
          <HeaderSection style={{ justifyContent: 'flex-end' }} />
        </HeaderContentContainer>
      </DesktopOnly>
      <MobileOnly>
        <HeaderContentContainer>
          <HeaderSection style={{ justifyContent: 'flex-start' }}>
            <Button
              style={{
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: '#364966',
              }}
              ype="text"
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'center' }}>
            <LogoLink to="/">
              <StyledTitle>CryptoTrack</StyledTitle>
            </LogoLink>
          </HeaderSection>
          <HeaderSection style={{ justifyContent: 'flex-end' }} />
        </HeaderContentContainer>
        <Drawer
          placement="left"
          closable="true"
          onClose={onClose}
          visible={visible}
          key="AppHeader-left-drawer"
        >
          <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/"
          >
            <h3>home</h3>
          </Link>
          {/* <Link
            onClick={onClose}
            style={{ textDecoration: 'none', color: '#000' }}
            to="/"
          >
            <h3>Blah</h3>
          </Link> */}
        </Drawer>
      </MobileOnly>
    </AppHeaderContainer>
  );
}
