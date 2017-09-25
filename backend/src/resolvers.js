import lodash from 'lodash';

import {User, Film} from './connectors';


const resolvers = {
    Query: {
        post: queryPost,
        users: queryUsers,
        films: queryFilms
    },
    User: getUser(),
    Film: getFilm(),
};

function queryUsers(obj, args, context, info) {
    return User.findAll();
}

function queryFilms(obj, args, context, info) {
    return Film.findAll();
}

function getUser() {
    return {
        films(user){
            return user.getFilms();
        },
    }
}

function getFilm() {
    return {
        users(film) {
            return film.getUsers();
        },
        async usersCount(film) {
            let users = await film.getUsers();
            return users.length;
        },
    }
}

const posts = [
    {id: 0, description: 'One', nextId: 1},
    {id: 1, description: 'Two', nextId: 'rnd'},
    {id: 2, description: 'Three'},
    {id: 3, description: 'Four'},
    {id: 4, description: 'Five'},
];

function queryPost(obj, args, context, info) {
    console.log('Request', args.id);

    return new Promise((resolve) => {
        setTimeout(() => {
            let post = posts[args.id];
            if (post.nextId === 'rnd') {
                resolve({
                    id: post.id,
                    description: post.description,
                    nextId: lodash.random(2, 3)
                });
            } else {
                resolve(post);
            }
        }, 300);
    });
}


export {resolvers};