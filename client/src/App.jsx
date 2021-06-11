import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import axios from 'axios';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import Header from './components/header/header.component';
import CreateArticlePage from './pages/create-article-page/create-article.page';
import HomePage from './pages/home-page/home.page';
import SignInSignUpModal from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'
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
