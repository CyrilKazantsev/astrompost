const onResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

class Api {
    constructor({baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = `Bearer ${token}`;
    }

    getPostsList(){
        return fetch(`${this._baseUrl}/posts`, {
            headers: {
                authorization: this._token,
            }
        }).then(onResponse).catch((err) => console.log(err))
    }

    getUserInfo(){
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._token,
            }
        }).then(onResponse).catch((err) => console.log(err))
    }

    setUserInfo(userData){
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(onResponse).catch((err) => console.log(err))
    }

    setLikeStatus(postId, isLike){
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                authorization: this._token,
            }
        }).then(onResponse).catch((err) => console.log(err))
    }

    getPostById(postId){
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            headers: {
                authorization: this._token,
            }
        }).then(onResponse).catch((err) => console.log(err))
    }

    deletePostById(postId) {
        return fetch(`${this._baseUrl}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                authorization: this._token,
            }
        }).then(onResponse).catch((err) => console.log(err))
    }
}

const config = {
    baseUrl: 'https://api.react-learning.ru',
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYjUiLCJpYXQiOjE2NDcwMTM4ODYsImV4cCI6MTY3ODU0OTg4Nn0.BKIEyBsqoDO4rTjdH4JXiyIOjZWAOHLPRttUNq9eJqo",
    
}

const api = new Api(config);

export default api