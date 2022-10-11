import {useState} from 'react'
import PieChart from './PieChart';

const Chart = ({labels,data}) => {
  const [interviewData] = useState({
      labels:labels,
      datasets: [
        {
          label: "Interview Status",
          data:data,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
  });
  return (
    <>
        <div>Chart</div>
        <div style={{margin:'auto',width:'500px' }}>
          <div style={{ width: 300 }}>
              <PieChart chartData={interviewData} />
          </div>
        </div>
    </>
  )
}

export default Chart