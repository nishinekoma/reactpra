import React from 'react';
import Task from './Task';
import {useDispatch, useSelector} from 'react-redux';
import { updateTaskState } from '../lib/store';

export default function TaskList() {//
    //we`re retrieving our state from the store
    const tasks = useSelector((state) => {//useSelectorフックを使うことで　Reduxストアから直接状態を取得できる。
        const tasksInOrder = [
            ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),//...state.taskbox.tasks.filter((t = ...state.taskbox.tasks) => t.state === 'TASK_PINNED'),
            ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
        ];
        const filteredTasks = tasksInOrder.filter(
            (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
        );
        return filteredTasks;
    });
    
    const {status} = useSelector((state) => state.taskbox);
    //Redux ストアから関数への参照を返す。必要に応じてこれを使用してアクションをディスパッチできます。
    const dispatch = useDispatch();

    const pintask = (value) => {
        //We`re dispatching the pinned event back to our store
        dispatch(updateTaskState({id: value, newTaskState: 'TASK_PINNED'}));
    };
    const archiveTask = (value) => {
        //We`re dispatching the Archive event back to our store
        dispatch(updateTaskState({id: value, newTaskState: 'TASK_ARCHIVED'}));
    };
    const LoadingRow = (
        <div className="loading-item">
            <span className="glow-checkbox" />
            <span className="glow-text">
                <span>Loading</span> <span>cool</span> <span>state</span>
            </span>
        </div>
    );
    if(status === 'loading') {
        return (
            <div className="list-item" data-testid="loading" key={"loading"}>
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
                {LoadingRow}
            </div>
        );
    }
    if(tasks.length === 0) {
        return (
            <div className="list-items" key={"empty"} data-testid="empty">
                <div className="wrapper-message">
                    <span className="icon-check" />
                    <p className="title-message">You have no tasks</p>
                    <p className="subtitle-message">Sit back and relax</p>
                </div>
            </div>
        );
    }
    return (
        <div className="list-items" data-testid="success" key={"success"}>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onPinTask={(task) => pintask(task)}
                    onArchiveTask={(task) => archiveTask(task)}
                />
            ))}
        </div>
    );
}
