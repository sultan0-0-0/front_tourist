const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const UPDATE_NEW_TITLE_TEXT = 'UPDATE_NEW_TITLE_TEXT';

const initialState = {
  posts: [
    {
      userId: 1,
      id: 1,
      title: 'Lalalend',
      body: 'Terrible film!',
      image: '/assets/travel.jpeg',
    },
    {
      userId: 2,
      id: 2,
      title: 'How to grow up cucumber',
      body: 'This is recipe about fast growing',
      image: '/assets/travel.jpeg',
    },
    {
      userId: 2,
      id: 3,
      title: 'Hello world',
      body: 'This is my first post',
      image: '/assets/travel.jpeg',
    },
  ],
  newPost: {
    newPostText: 'startMessage',
    newTitleText: 'startTitle',
    imageSrc: '**some-root**',
  },
};

const blogReducer = (action, state = initialState) => {
  switch (action.type) {
    case ADD_POST:
      const newPost = {
        userId: action.userId,
        id: action.id,
        title: state.newPost.newTitleText,
        body: state.newPost.newPostText,
        image: state.newPost.imageSrc,
      };
      state.posts.push(newPost);

      state.newPost.newPostText = '';
      state.newPost.newTitleText = '';
      state.newPost.imageSrc = '';
      break;
    case UPDATE_NEW_POST_TEXT:
      state.newPost.newPostText = action.newText;
      break;
    case UPDATE_NEW_TITLE_TEXT:
      state.newPost.newTitleText = action.newTitle;
      break;
    default:
      return state;
  }
};

export const addPostAC = (userId, id) => ({ type: ADD_POST, userId, id });

export const updateNewPostTextAC = (text, userId, id) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
  userId,
  id,
});

export const updateNewTitleTextAC = (title, userId, id) => ({
  type: UPDATE_NEW_TITLE_TEXT,
  newTitle: title,
  userId,
  id,
});

export default blogReducer;
