import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import axios from 'axios';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import Header from './components/header/header.component';
import CreateArticlePage from './pages/create-article-page/create-article.page';
import HomePage from './pages/home-page/home.page';
import ArticlePage from './pages/article-page/article.page';
import SignInSignUpModal from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'
import ArticleListLoading from './components/article-list/article-list-loading.component';
import { modalAtom, userAtom, alertAtom } from './global/global.state';
import api from './constant/api.constant';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const modalView = useRecoilValue(modalAtom);
  const [currentUser, setUserState] = useRecoilState(userAtom);
  const alertContent = useRecoilValue(alertAtom);
  const resetAlert = useResetRecoilState(alertAtom);
  const [userStateLoading, setUserStateLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await axios.get(api.currentUser, { withCredentials: true });
      if (user) setUserState(user.data);
      setUserStateLoading(false);
    })()
  }, []);

  const closeAlert = () => {
    resetAlert();
  }

  return (
    <div>
      <Header isLoading={userStateLoading} />
      <Switch>
        <Route exact path='/' render={() => (
          <React.Suspense fallback={<ArticleListLoading />}>
            <HomePage />
          </React.Suspense>
        )} />
        <Route
          exact path='/create'
          render={() => !currentUser ?
            (<Redirect to='/' />) :
            (<CreateArticlePage />)} />
        <Route path='/article/:id' component={ArticlePage} />
      </Switch>

      {
        modalView.view ? <SignInSignUpModal /> : ''
      }

      <SnackBar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!alertContent.hidden}
        onClose={closeAlert}
        message={alertContent.message}
        key={'bottom' + 'left'}
        autoHideDuration={2000}
      >
        <Alert onClose={closeAlert} severity="success">
          {alertContent.message}
        </Alert>
      </SnackBar>

    </div>
  );
}

export default App;
