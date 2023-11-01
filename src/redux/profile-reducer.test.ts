import profileReducer, {actions} from "./profile-reducer";

const state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'My name is Mikhailo', likesCount: 20},
        {id: 3, message: 'Hey', likesCount: 1},
        {id: 4, message: 'Yo', likesCount: 10},
    ],
    profile: null,
    status: ""
}

test('new post should be added', () => {
    const action = actions.addPost("it-kamasutra")
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
});

test('after deleting length of message should be decrement', () => {
    const action = actions.deletePost(1)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
});
