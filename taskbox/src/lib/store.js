/* A simple redux store/actions/reducer implementation. 
   A true app would be more complex and separated into different files. 本当のアプリ内はファイルが異なりもっと複雑だろう。
*/
import {
  configureStore,
  createSlice,
  createAsyncThunk, 
} from '@reduxjs/toolkit';

/**
 * The initial state of our store when the app loads.
 * Usually, you would fetch this from a server. Let`s not worry about that now.
 */
const TaskBoxData = {
    tasks: [],
    status: 'idle',
    error: null,
};
/**
 * Creates an asyncThunk to fetch tasks from remote endpoint.
 * You can read more about Redux Toolkit`s thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 * async/await 非同期処理の構文。
 * async 非同期関数を定義する関数、　
 * awaitとは　async function内でPromiseの結果（resolve、reject）が返されるまで待機する（処理を一時停止する）演算子のこと。
 */
 export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
       const response = await fetch(//非同期処理されちゃうので同期するためにやる。
         'https://jsonplaceholder.typicode.com/todos?userId=1'
       );
       const data = await response.json();//同じく同期。
       const result = data.map((task) => ({//mapは生成されたオブジェクトを新しい配列
         id: `${task.id}`,
         title: task.title,
         state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',//trueの時、'TASK_ARCHIVED'
       }));
       return result;
     });


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
    /*
    * Extends the reducer for the async actions (createAsyncThunkの戻り値を参照。)
    * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
    */
    extraReducers(builder) {
        builder
          .addCase(fetchTasks.pending, (state) =>{
            state.status = 'loading';
            state.error = null;
            state.tasks = [];
          })
          .addCase(fetchTasks.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.error = null;
            state.tasks = [];
          })
          .addCase(fetchTasks.rejected, (state) => {
            state.status = 'failed';
            state.error = "Something went wrong";
            state.tasks = [];
          });
        },
    });

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;
/** 
 * Our app`s store configuration goes here. Redux store is created by Redux method for configureStore 
 * ReduxストアはconfigureStoreのReduxメソッドによって作成されます
 * Read more about Redux`s configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
    reducer: {
        taskbox: TasksSlice.reducer,//現在のstate,Actionから新しいstateを生成。
    },
}); 

export default store;
/*Build a simple Redux store that responds to action that change the state of tasks in files called in a directory
 *ディレクトリ内で呼び出されるファイル内のタスク状態を変更するアクションに応答する単純なReduxストアを構築します。 */

/**Reduxの3原則
 * Single source of truth
 * State is read-only
 * Changes are made with pure functions 
 * */ 