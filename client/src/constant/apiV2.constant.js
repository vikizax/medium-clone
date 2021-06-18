const apiV2 =
    process.env.NODE_ENV === 'production' ?
        {
            'uploadFile': '/api/v2/article/uploadfile',
            'article': '/api/v2/article'
        } : {
            'uploadFile': 'http://localhost:5000/api/v2/article/uploadfile',
            'article': 'http://localhost:5000/api/v2/article'
        }

export default apiV2;