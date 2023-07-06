import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { styled } from "styled-components";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "../config/redux/configStore";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <PageLayout>
        <GlobalStyle />
        <Header />
        <ContentLayout>{children}</ContentLayout>
      </PageLayout>
    </Provider>
  );
};

export default Layout;

const PageLayout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const ContentLayout = styled.div`
  margin-top: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 1200px;
  min-width: 800px;
`;
