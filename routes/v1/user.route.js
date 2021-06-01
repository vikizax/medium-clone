import { getAll, deleteOne, getOne } from '../../controllers/v1/user.controller.js';
import { isLoggedIn } from '../../controllers/v1/authentication.controller.js';
export default router => {

    // get logged in user details
    router
        .route('/user')
        .get(isLoggedIn)

    router
        .route('/user/:id')
        .get(getOne)
        .delete(deleteOne);

    router
        .route('/users')
        .get(getAll);

}