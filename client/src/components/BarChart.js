import {useState} from 'react'
import PieChart from './PieChart';

const Chart = ({labels,data}) => {
  const [interviewData] = useState({
    labels: labels,
    datasets: [{
      label: 'Interview Management',
      data: data,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  })
  
  return (
    <>
        <div style={{margin:'auto',width:'500px' }}>
          <div style={{ width: "90%" }}>
              <PieChart chartData={interviewData} />
          </div>
        </div>
    </>
  )
}

export default Chart