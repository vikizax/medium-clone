import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import axios from 'axios';
import Header from './components/header/header.component';
import CreateArticlePage from './pages/create-article-page/create-article.page';
import HomePage from './pages/home-page/home.page';
import SignInSignUpModal from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'
import { modalAtom, userAtom } from './global/global.state';
import api from './constant/api.constant';

const App = () => {
  const modalView = useRecoilValue(modalAtom);
  const [currentUser, setUserState] = useRecoilState(userAtom);
  const [userStateLoading, setUserStateLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const user = await axios.get(api.currentUser, { withCredentials: true });
      if (user) setUserState(user.data);
      setUserStateLoading(false);
    })()
  }, []);

  return (
    <div>
      <Header isLoading={userStateLoading} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route
          exact path='/create'
          render={() => !currentUser ?
            (<Redirect to='/' />) :
            (<CreateArticlePage />)} />
      </Switch>
      {
        modalView.view ? <SignInSignUpModal /> : ''
      }
    </div>
  );
}

export default App;
