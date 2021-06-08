import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Header from './components/header/header.component';
import CreateArticlePage from './pages/create-article-page/create-article.page';
import HomePage from './pages/home-page/home.page';
import SignInSignUpModal from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'

import { modalAtom } from './globalState/global.state';

const App = () => {
  const modalView = useRecoilValue(modalAtom)
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/create' component={CreateArticlePage} />
      </Switch>
      {
        modalView.view ? <SignInSignUpModal /> : ''
      }
    </div>
  );
}

export default App;
