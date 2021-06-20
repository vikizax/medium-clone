import React from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import Header from './components/header/header.component';
import CreateArticlePage from './pages/create-article-page/create-article.page';
import HomePage from './pages/home-page/home.page';
import ArticlePage from './pages/article-page/article.page';
import SignInSignUpModal from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'
import MyArticlesPage from './pages/my-articles-page/my-articles.page';
import EditArticlePage from './pages/edit-article-page/edit-article.page';
import { modalAtom, userAtom, alertAtom } from './global/global.state';
import { getCurrentUser } from './global/action';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const modalView = useRecoilValue(modalAtom);
  const [currentUser, setUserState] = useRecoilState(userAtom);
  const [alertContent, setAlertContent] = useRecoilState(alertAtom);
  const { isLoading } = useQuery('userQ', getCurrentUser, {
    onSuccess: (data) => {
      setUserState(data);
    }
  });

  const closeAlert = () => {
    setAlertContent(old => ({ ...old, hidden: true }));
  }

  return (
    <div>
      <Header loadingUser={isLoading} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/article/:id' component={ArticlePage} />
        <Route
          exact path='/create'
          render={() => !currentUser ?
            (<Redirect to='/' />) :
            (<CreateArticlePage />)}
        />
        <Route path='/edit/:id'
          render={() => (
            !currentUser ?
              (<Redirect to='/' />) :
              (<EditArticlePage />))}
        />
        <Route exact path='/stories' render={() => (
          !currentUser ?
            (<Redirect to='/' />) :
            (<MyArticlesPage />)
        )} />
      </Switch>

      <SnackBar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!alertContent.hidden}
        onClose={closeAlert}
        message={alertContent.message}
        key={'bottom' + 'left'}
        autoHideDuration={2000}
      >
        <Alert onClose={closeAlert} severity={alertContent.severity}>
          {alertContent.message}
        </Alert>
      </SnackBar>

      {
        modalView.view ? <SignInSignUpModal /> : ''
      }
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
