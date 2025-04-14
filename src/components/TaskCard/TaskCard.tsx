import React, {useState} from 'react';
import styled from 'styled-components';
import {Task} from "../../types/task";
import iconStatus from '../../assets/statusIcon.svg';
import iconDelete from '../../assets/iconDelete.svg';
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, updateTask} from "../../features/task/taskSlice";
import {selectAssignees} from "../../features/dictionary/dictionarySlice";
import icon from "../../assets/vector.svg";
import workIcon from "../../assets/workIcon.svg";

type TaskCardProps = {
    task: Task;
    id: string;
    statuses: { [key: number]: string };
    status: number;
    background: string
};

const TaskCard = ({ task, statuses, status, id, background }: TaskCardProps) => {
    const assignees = useSelector(selectAssignees);
    const currentAssignee = task.assigneeId ? assignees[task.assigneeId] : "";

    const dispatch = useDispatch();
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingAssignee, setIsEditingAssignee] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.taskName);
    const [editedAssignee, setEditedAssignee] = useState(currentAssignee);

    const handleSaveTitle = () => {
        if (editedTitle.trim()) {
            dispatch(updateTask({
                oldTaskName: task.taskName,
                updatedTask: {
                    ...task,
                    taskName: editedTitle
                }
            }));
        }
        setIsEditingTitle(false);
    };

    const handleSaveAssignee = () => {
        setEditedAssignee(editedAssignee);
        setIsEditingAssignee(false);
    };

    const handleDeleteTask = () => {
        dispatch(deleteTask(id));
    };

    return (
        <Card>
            <TitleContainer>
                <StatusIcon src={iconStatus} alt="Status" />
                {isEditingTitle ? (
                    <TitleInput
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        onBlur={handleSaveTitle}
                        autoFocus
                    />
                ) : (
                    <TaskTitle onDoubleClick={() => setIsEditingTitle(true)}>
                        {task.taskName}
                    </TaskTitle>
                )}
                <DeleteButton onClick={handleDeleteTask}>
                    <DeleteIcon src={iconDelete} alt="Delete" />
                </DeleteButton>
            </TitleContainer>

            <AssigneeContainer>
                {isEditingAssignee ? (
                    <AssigneeInput
                        type="text"
                        value={editedAssignee}
                        onChange={(e) => setEditedAssignee(e.target.value)}
                        onBlur={handleSaveAssignee}
                        autoFocus
                        placeholder="Введите имя исполнителя"
                    />
                ) : (
                    <AssigneeButton onClick={() => setIsEditingAssignee(true)}>
                        {editedAssignee || "Добавить ответственного"}
                    </AssigneeButton>
                )}
            </AssigneeContainer>

            <StatusText background={background}>
                <img src={statuses[status] === 'В ожидании' ? icon : workIcon}/>
                {statuses[status]}
            </StatusText>
        </Card>
    );
};

export default TaskCard


const Card = styled.div`
    max-width: 425px;
    text-align: start;
    background: #FFFFFF;
    border: 1px solid #bbddd6;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease, transform 0.2s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 8px;
`;

const StatusIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const TaskTitle = styled.h3`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    flex-grow: 1;
    cursor: pointer;
`;

const TitleInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &::placeholder {
        color: #aaa;
    }
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
`;

const DeleteIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const AssigneeContainer = styled.div`
    margin-bottom: 8px;
`;

const AssigneeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    color: #555;
    text-align: left;
`;

const AssigneeInput = styled.input`
    width: 170px;
    padding: 12px 16px;
    border: none;
    border-radius: 12px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    color: #333;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &::placeholder {
        color: #aaa;
    }
    
`;

const StatusText = styled.p<{background: string}>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin: 0;
    font-size: 14px;
    color: #616161;
    background: ${props => props.background};
    border-radius: 9999px;
    padding: 4px 12px;
`;