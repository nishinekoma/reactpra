import React from "react";

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