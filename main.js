//-----------------index-html-------------------
let mainDiv = document.getElementById('mainDiv')
fetch('https://jsonplaceholder.typicode.com/users')
.then(value => value.json())
.then(users => {
    for (const user of users) {
        const userDiv = document.createElement('div')
        const p = document.createElement('p')
        const img = document.createElement('img')
        const h3 = document.createElement('h3')
        const showUser = document.createElement('a')
        p.innerText = user.id
        img.src = 'https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg'
        h3.innerText = user.name
        showUser.innerText = 'Show Information'
        showUser.href =  'user-details.html'
        userDiv.classList.add('userDiv')
        userDiv.append(p ,img, h3, showUser)
        mainDiv.appendChild(userDiv)
    }
})
//-----------------user-details.html-------------------
fetch('https://jsonplaceholder.typicode.com/users')
.then(value => value.json())
.then(users => {
    let usersAllInformation = document.getElementById('usersAllInformation')
    for (const user of users) {
        const userDiv = document.createElement('div')
        const button = document.createElement('button')
        button.innerText = 'Post of current user'
        userDiv.classList.add('userDiv')
        for (const userKey in user) {
            const userDivKey = document.createElement('div')
            userDivKey.innerText = `${userKey} : ${user[userKey]}`
            userDiv.append(userDivKey , button)
        }
        usersAllInformation.appendChild(userDiv)
    }
})






// if (userKey !== 'object'){
//     const userDivKey = document.createElement('div')
//     const ul = document.createElement('ul')
//     const array = userKey[userKey]
//     for (const item of array) {
//         const li = document.createElement('li')
//         li.innerText = item
//         ul.appendChild(li)
//     }
//     userDivKey.appendChild(ul)
//     userDiv.appendChild(userDivKey)
// }