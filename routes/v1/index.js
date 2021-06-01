import articleRoute from './article.route.js';
import userRoute from './user.route.js';
import authencticationRoute from './authentication.route.js';

export default router => {
    userRoute(router);
    articleRoute(router);
    authencticationRoute(router);
}


