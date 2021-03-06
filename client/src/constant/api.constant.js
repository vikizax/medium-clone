const api =
    process.env.NODE_ENV === 'production'
        ? {
            'signup': '/api/v1/auth/signup',
            'signin': '/api/v1/auth/signin',
            'signout': '/api/v1/auth/signout',
            'currentUser': '/api/v1/user/current',
            'uploadFile': '/api/v1/article/uploadfile',
            'image': '/uploads/',
            'article': '/api/v1/article',
            'stories': '/api/v1/article/stories',
            'forgetPassword': '/api/v1/auth/forgetPassword',
            'updatePassword': '/api/v1/auth/updatePassword'
        } : {
            'signup': 'http://localhost:5000/api/v1/auth/signup',
            'signin': 'http://localhost:5000/api/v1/auth/signin',
            'signout': 'http://localhost:5000/api/v1/auth/signout',
            'currentUser': 'http://localhost:5000/api/v1/user/current',
            'uploadFile': 'http://localhost:5000/api/v1/article/uploadfile',
            'image': 'http://localhost:5000/uploads/',
            'article': 'http://localhost:5000/api/v1/article',
            'stories': 'http://localhost:5000/api/v1/article/stories',
            'forgetPassword': 'http://localhost:5000/api/v1/auth/forgetPassword',
            'updatePassword': 'http://localhost:5000/api/v1/auth/updatePassword'
        }

export default api;