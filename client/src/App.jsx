import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Header from './components/header/header.component';
import CreateArticlePage from './pages/create-article-page/create-article.page';
import HomePage from './pages/home-page/home.page';
// import SignUp from './components/sign-up/sign-up.component';
// import SignIn from './components/sign-in/sign-in.component';
import SignInSignUpModal, { modalAtom } from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'
const App = () => {
  const modalView = useRecoilValue(modalAtom)
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/create' component={CreateArticlePage} />
        {/* <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} /> */}
      </Switch>
      {
        modalView.view ? <SignInSignUpModal /> : ''
      }
    </div>
  );
}

export default App;
