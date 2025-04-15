import React from "react";
import styled from "styled-components";

type ProgressProps = {
    percent: number;
}

const Progress = ({ percent }: ProgressProps) => {
    return (
        <ProgressContainer>
            <ProgressLabel>{percent}% выполненных задач</ProgressLabel>
            <ProgressBar>
                <ProgressFill percent={percent} />
            </ProgressBar>
        </ProgressContainer>
    );
};

export default Progress;

const ProgressContainer = styled.div`
    margin-top: 1rem;
    font-size: 14px;
    width: 70%;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ProgressLabel = styled.p`
  display: block;
  color: #3b82f6;
  font-weight: 500;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  background-color: #e5e7eb;
  border-radius: 9999px;
  height: 8px;
  width: 100%;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ percent: number }>`
  background-color: #3b82f6;
  height: 100%;
  border-radius: 9999px;
  width: ${({ percent }) => percent}%;
  transition: width 0.3s ease;
`;
