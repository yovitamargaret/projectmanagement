import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBarComponent = ({ projectId }) => {
  const [taskPercentage, setTaskPercentage] = useState(0);


  useEffect(() => {
    axios({
        method: "GET",
        url: `http://localhost:8088/api/task_detail/project/${projectId}`
    }).then((response) => {
      const taskDetails = response.data.data;
      const totalTasks = taskDetails.length;
      const doneTasks = taskDetails.filter(task => task.task_status === 'Done').length;
      const progress = (doneTasks / totalTasks) * 100;
      setTaskPercentage(progress);
    }).catch((error) => {
        console.log(error);
    });
}, [projectId]);

  return (
    <div>
      <ProgressBar now={taskPercentage} label={`${taskPercentage.toFixed(0)}%`} />
    </div>
  );
};

export default ProgressBarComponent;