import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Andriana', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 1, name: 'Taras', followed: false,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 2, name: 'Mikhailo', followed: true,
                photos: {small: null, large: null}, status: 'status 0'
            },
            {
                id: 3, name: 'Larisa', followed: true,
                photos: {small: null, large: null}, status: 'status 0'
            }
        ],
        pageSize: 5,
        totalUserCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})

test('follow success', () => {

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {

    const newState = usersReducer(state, actions.followSuccess(1))

    expect(newState.users[2].followed).toBeTruthy()
    expect(newState.users[3].followed).toBeTruthy()
})