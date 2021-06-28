import React, { lazy, Suspense } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'
import Header from './components/header/header.component';
import SignInSignUpModal from './components/sign-in-sign-up-modal/sign-in-sign-up-modal.component'
import { modalAtom, userAtom, alertAtom } from './global/global.state';
import { getCurrentUser } from './global/action';

const HomePage = lazy(() => import('./pages/home-page/home.page'));

const CreateArticlePage = lazy(() => import('./pages/create-article-page/create-article.page'));

const ArticlePage = lazy(() => import('./pages/article-page/article.page'));

const MyArticlesPage = lazy(() => import('./pages/my-articles-page/my-articles.page'));

const EditArticlePage = lazy(() => import('./pages/edit-article-page/edit-article.page'));

const UpdatePasswordPage = lazy(() => import('./pages/reset-password-page/reset-password.page'))

const NotFoundPage = lazy(() => import('./pages/not-found-page/not-found.page'));

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

      <Suspense fallback={<LinearProgress />}>

        <Switch>

          <ErrorBoundary>

            <Route exact path='/' component={HomePage} />

            <Route
              exact path='/create'
              render={() => !currentUser ?
                (<Redirect to='/' />) :
                (<CreateArticlePage />)}
            />

            <Route path='/article/:id' component={ArticlePage} />

            <Route exact path='/stories' render={() => (
              !currentUser ?
                (<Redirect to='/' />) :
                (<MyArticlesPage />)
            )} />

            <Route path='/edit/:id'
              render={() => (
                !currentUser ?
                  (<Redirect to='/' />) :
                  (<EditArticlePage />))}
            />

            <Route path='/resetPassword/:token' component={UpdatePasswordPage} />
            
            <Route render={({ location: { pathname } }) => {

              const paths = ['/create', '/article', '/resetPassword', '/edit', '/stories'];

              const contains = (target, pattern) => {
                let value = 0;
                pattern.forEach(function (word) {
                  value = value + target.includes(word);
                });
                return (value === 1)
              }

              if (contains(pathname, paths))
                return
              else if (pathname === '/')
                return
              else
                return (<NotFoundPage />);

            }} />

          </ErrorBoundary>

        </Switch>

      </Suspense>

      <SnackBar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={!alertContent.hidden}
        onClose={closeAlert}
        message={alertContent.message}
        key={'bottomleft'}
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
