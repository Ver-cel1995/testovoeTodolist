import React from 'react';
import styled from 'styled-components';
import TaskCard from "../TaskCard/TaskCard";
import {Task} from "../../types/task";
import {addTask} from "../../features/task/taskSlice";
import {useDispatch} from "react-redux";
import icon from '../../assets/vector.svg'
import workIcon from '../../assets/workIcon.svg'

type ColumnProps = {
    title: string;
    status: number;
    tasks: Task[];
    background: string;
    statuses: { [key: number]: string };
};

const Column = ({ status, tasks, background, statuses }: ColumnProps) => {
    const dispatch = useDispatch();
    const filteredTasks = tasks.filter(task => task.statusId === status);

    const handleAddTask = () => {
        const newTask = {
            taskName: 'Новая задача',
            description: '',
            assigneeId: 0,
            dueDate: "2025-04-25",
            priorityId: 1,
            statusId: status,
        };
        dispatch(addTask(newTask));
    };

    return (
        <ColumnWrapper>
            <div style={{display: "flex", alignItems: "center", gap: '12px'}}>
                <ColumnTitle background={background}>
                    <img src={statuses[status] === 'В ожидании' ? icon : workIcon}/>
                    {statuses[status]}
                </ColumnTitle>
                <span style={{marginBottom: '5px'}}>{filteredTasks.length}</span>
            </div>
            <ColumnBody background={background}>
                <TaskCardsWindow>
                    {filteredTasks.map(task => (
                        <TaskCard key={task.taskName} task={task} id={task.taskName} statuses={statuses} status={status} background={background}/>
                    ))}
                </TaskCardsWindow>
                <AddTaskButton onClick={handleAddTask}>Новая задача</AddTaskButton>
            </ColumnBody>
        </ColumnWrapper>
    );
};

export default Column;

const ColumnWrapper = styled.div`
    border-radius: 8px;
    min-width: 280px;
`;

const ColumnBody = styled.div<{background: string}>`
    background: ${props => props.background};
    padding: 12px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`;

const TaskCardsWindow = styled.div`
    max-height: calc(4 * 120px); /* Примерно 4 карточки */
    overflow-y: auto;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    /* Стилизация скроллбара */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.2);
        border-radius: 3px;
    }
`;

const ColumnTitle = styled.h2<{background: string}>`
    background: ${props => props.background};
    font-size: 16px;
    font-weight: 600;
    color: #0b6f62;
    border-radius: 9999px;
    padding: 4px 12px;
    max-width: 116px;
    margin-bottom: 20px;
    text-align: start;
    display: flex;
    gap: 5px;
    align-items: center;
`;

const AddTaskButton = styled.button`
    background: transparent;
    color: #5e6c84;
    text-align: center;
    cursor: pointer;
    border: 1px solid #0b6f62;
    border-radius: 12px;
    padding: 12px 24px;
    width: 100%;

    &:hover {
        background: #e1e4e8;
    }
`;