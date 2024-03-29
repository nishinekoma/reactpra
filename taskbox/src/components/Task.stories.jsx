import Task from './Task';

//文書化およびテストしているコンポーネントについて Storybook に伝えるために、以下defaultを含むエクスポートを作成
export default {
    component: Task,//ンポーネント自体
    title: 'Task',// Storybook サイドバーでコンポーネントをグループ化または分類する方法
    tags: ['autodocs']//Genarating Automatically of component doc 
};
//args : Storybook を再起動せずに、コントロール アドオンを使用してコンポーネントをライブ編集
//task : ストーリーを作成するときは、基本task引数を使用
export const Default = {
    args: {
        task: {
            id: '1',
            title: 'test Task',
            state: 'TASK_INBOX',
        },
    },
};
//Pinned 固定。
export const Pinned = {
    args: {
        task:{
            ...Default.args.task,
            state: 'TASK_PINNED',//cssにもある★クラスに影響する。
        },
    },
};

export const Archived = {
    args: {
        task:{
            ...Default.args.task,
            state: 'TASK_ARCHIVED',
        },
    },
};
