import React from 'react';
import PropTypes from 'prop-types';

export default function Task({ task : {id, title, state}, onArchiveTask, onPinTask }) {
    return (//jsxを利用し内部にhtmlを描く　Drow html inside using jsx.
        <div className={'list-item ${state}'}>
            <label 
                htmlFor="checked" 
                aria-label={'archiveTask-${id}'}
                className="checkbox"
            >
                <input 
                    type="checkbox"
                    disabled={true}
                    name="checked"
                    id={'archiveTask-${id}'}
                    checked={state === "TASK_ARCHIVED"}
                    />
                <span
                    className="checkbox-custom"
                    onClick={() => onArchiveTask(id)}
                    />
            </label>

            <label htmlFor="title" aria-label={title} className="title">
                <input
                    type="text"
                    value={title}
                    readOnly={true}
                    name="title"
                    placeholder="Input title"
                    />
            </label>

            {state !== "TASK_ARCHIVED" && (
                <button
                    className="pin-button"
                    onClick={() => onPinTask(id)}
                    id="{'pinTask-${id}'}"
                    key={'pinTask-${id}'}
                >
                    <span className={'icon-star'} /> {/*アイコン★*/}
                </button>
            )}
        </div>
    );
}

Task.PropTypes = {//タスクコンポーネントが誤用された場合、開発中の警告が表示される。
    /** Composition(構成) of the task */
    task: PropTypes.shape({/**shape 形状 */
        /** Id of the task */
        id: PropTypes.string.isRequired,
        /**Title of the task */
        title: PropTypes.string.isRequired,
        /**Current state of the task */
        state: PropTypes.string.isRequired,
    }),
    /** Event to change the task to archived */
    onArchiveTask: PropTypes.func,
    /** Event to change the task to pinned イベント変更を固定に*/
    onPinTask: PropTypes.func,
};
