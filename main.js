//-----------------index-html-------------------
let mainDiv = document.getElementById('mainDiv')
fetch('https://jsonplaceholder.typicode.com/users')
.then(value => value.json())
.then(users => {
    for (const user of users) {
        const userDiv = document.createElement('div')
        const img = document.createElement('img')
        img.src = 'https://plus.unsplash.com/premium_vector-1721131162449-5676bedcd9a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFjY2lhJTIwZGVsbGElMjBwZXJzb25hfGVufDB8fDB8fHww'
        const p = document.createElement('p')
        const h3 = document.createElement('h3')
        const showUser = document.createElement('a')
        showUser.classList.add('showUser')
        p.innerText = user.id
        h3.innerText = user.name
        showUser.innerText = 'Show Information'
        showUser.onclick = function (){
                location.href = 'user-details.html'
                localStorage.setItem(`user`, JSON.stringify(user))
        }
        userDiv.classList.add('userDiv')
        userDiv.append(p , img, h3, showUser)
        mainDiv.appendChild(userDiv)
    }
})
//-----------------user-details.html-------------------
fetch('https://jsonplaceholder.typicode.com/users')
.then(value => value.json())
.then(users => {
    let userAll = JSON.parse(localStorage.getItem(`user`)).id
    let usersAllInformation = document.getElementById('usersAllInformation')
    for (const user of users) {
        if (userAll === user.id) {
            const userWrapper = document.createElement('div')
            userWrapper.classList.add('userWrapper')
            const userDiv = document.createElement('div')
            const button = document.createElement('button')
            button.classList.add('showPosts')
            const postDiv = document.createElement('div')
            postDiv.classList.add('postDiv')
            postDiv.style.display = 'none'
            button.innerText = `Posts of ${user.name}`
            button.onclick = function () {
                button.disabled = true
                button.style.background = 'lightgrey'
                postDiv.style.display = 'block'
                userDiv.style.display = 'none'
                fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(value => value.json())
                    .then(posts => {
                        const showPostAllInformation = document.createElement('button')
                        showPostAllInformation.innerText = 'Show information of posts'
                        showPostAllInformation.href = 'post-details.html'
                        showPostAllInformation.classList.add('showPostAllInformation')
                        for (const post of posts) {
                            const divPostWrapper = document.createElement('div')
                            const divWithPosts = document.createElement('div')
                            divPostWrapper.classList.add('divPostWrapper')
                            if (user.id === post.userId)
                                divWithPosts.innerText = `${post.id} : ${post.title}`
                            divPostWrapper.append(divWithPosts, showPostAllInformation)
                            postDiv.append(divPostWrapper)
                            showPostAllInformation.onclick = function (){
                                location.href = 'post-details.html'
                                localStorage.setItem(`userId`,`${post.userId}`)
                            }
                        }
                    })
            }
            userDiv.classList.add('userDivPage2')
            for (const userKey in user) {
                if (typeof user[userKey] === 'object') {
                    for (const keyInUserKey in user[userKey]) {
                        if (typeof user[userKey][keyInUserKey] === 'object') {
                            for (const keyInKeyInUserKey in user[userKey][keyInUserKey]) {
                                const keyInKeyInUserKeyDiv = document.createElement('div')
                                keyInKeyInUserKeyDiv.innerText = `${keyInUserKey} : ${user[userKey][keyInUserKey][keyInKeyInUserKey]}`
                                userDiv.appendChild(keyInKeyInUserKeyDiv)
                            }
                        } else {
                            const keyInUserKeyDiv = document.createElement('div')
                            keyInUserKeyDiv.innerText = `${keyInUserKey} : ${user[userKey][keyInUserKey]}`
                            userDiv.appendChild(keyInUserKeyDiv)
                        }
                    }
                } else {
                    const userDivKey = document.createElement('div')
                    userDivKey.innerText = `${userKey} : ${user[userKey]}`
                    userDiv.append(userDivKey, button)
                }
            }
            userWrapper.append(userDiv, postDiv, button)
            usersAllInformation.appendChild(userWrapper)
        }
        }
})



//-------------------------post-details.html------------------------
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(value => value.json())
    .then(posts => {
        let postAll = JSON.parse(localStorage.getItem('user')).id
        const wrapperPosts = document.getElementById('wrapperPosts')
        for (const post of posts) {
            if (postAll === post.userId) {
                const postDiv = document.createElement('div')
                postDiv.classList.add('postDivPostDetails')
                for (const postKey in post) {
                    const postKeyDiv = document.createElement('div')
                    postKeyDiv.innerText = `${postKey} : ${post[postKey]}`
                    postDiv.appendChild(postKeyDiv)
                }
                const showComments = document.createElement('button')
                showComments.innerText = 'Show comments'
                showComments.classList.add('showComments')
                showComments.onclick = function (){
                    showComments.disabled = true
                    fetch('https://jsonplaceholder.typicode.com/comments')
                        .then(value => value.json())
                        .then(comments => {
                            for (const comment of comments) {
                                const commentDiv = document.createElement('div')
                                commentDiv.classList.add('commentDiv')
                                if (comment.postId === post.userId){
                                    for (const commentKey in comment) {
                                        const commentKeyDiv = document.createElement('div')
                                        commentKeyDiv.innerText = `${commentKey} : ${comment[commentKey]}`
                                        commentDiv.appendChild(commentKeyDiv)
                                    }
                                }
                                postDiv.appendChild(commentDiv)
                            }
                        })
                }
                postDiv.appendChild(showComments)
                wrapperPosts.appendChild(postDiv)
            }
        }
    })



