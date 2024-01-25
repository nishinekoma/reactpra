/* A simple redux store/actions/reducer implementation. 
   A true app would be more complex and separated into different files. 本当のアプリ内はファイルが異なりもっと複雑だろう。
*/
import { configureStore, createSlice } from '@reduxjs/toolkit';

/**
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let`s not worry about that now.
 */
const defaultTasks = [
    {id: '1', title: 'Something', state: 'TASK_INBOX'},
    {id: '2', title: 'Something more', state: 'TASK_INBOX'},
    {id: '3', title: 'Something else', state: 'TASK_INBOX'},
    {id: '4', title: 'Something again', state: 'TASK_INBOX'},
];
const TaskBoxData = {
    tasks: defaultTasks,
    status: 'idle',
    error: null,
};

/**
 * The store is created here.
 * You can read more about Redux Toolkit`s slice in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({/**Slice は特定の状態とそれに関するreducers（Redux（app state ） appの状態の変更を処理する関数）をまとめたもの。 */
    name: 'taskbox',
    initialState: TaskBoxData,
    reducers: {
        updateTaskState: (state,action) => {
            const {id, newTaskState} = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id);
            if(task >= 0) {
                state.tasks[task].state = newTaskState;
            }
        },
    },
});

//The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/** 
 * Our app`s store configuration goes here. Redux store is created by Redux method for configureStore 
 * ReduxストアはconfigureStoreのReduxメソッドによって作成されます
 * Read more about Redux`s configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
    reducer: {
        taskbox: TasksSlice.reducer,
    },
});

export default store;
/*Build a simple Redux store that responds to action that change the state of tasks in files called in a directory
 *ディレクトリ内で呼び出されるファイル内のタスク状態を変更するアクションに応答する単純なReduxストアを構築します。 */