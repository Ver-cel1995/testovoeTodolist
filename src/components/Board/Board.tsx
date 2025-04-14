import React, {useEffect} from 'react';
import styled from 'styled-components';
import tasksData from '../../data/data.json';
import {useDispatch, useSelector} from "react-redux";
import {selectAllTasks, setTasks} from "../../features/task/taskSlice";
import Column from "../Column/Column";
import {selectStatuses} from "../../features/dictionary/dictionarySlice";

const Board = () => {
    const tasks = useSelector(selectAllTasks)
    const statuses = useSelector(selectStatuses);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(setTasks(tasksData));
    }, []);

    return (
        <BoardWrapper>
            <ColumnsContainer>
                <Column title="В ожидании" status={0} tasks={tasks} background={'#d4f7f3'} statuses={statuses}/>
                <Column title="В работе" status={1} tasks={tasks} background={'#f7f5d4'} statuses={statuses}/>
                <Column title="Готово" status={2} tasks={tasks} background={'#d4e0f7'} statuses={statuses}/>
            </ColumnsContainer>
        </BoardWrapper>
    );
};

export default Board;

const BoardWrapper = styled.div`
    display: flex;
    min-height: 764px;
`;

const ColumnsContainer = styled.div`
    display: flex;
`;