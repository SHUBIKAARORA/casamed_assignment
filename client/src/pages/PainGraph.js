import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

import {
  Line
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function PainGraph() {
  const { patientId } = useParams();
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    const fetchPainData = async () => {
      try {
        const res = await API.get(`/pain-score/${patientId}`);
        setDataPoints(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPainData();
  }, [patientId]);

  // sort by date (important!)
  const sortedData = [...dataPoints].sort(
    (a, b) => new Date(a.recordedAt) - new Date(b.recordedAt)
  );

  const data = {
    labels: sortedData.map((d) =>
      new Date(d.recordedAt).toLocaleString()
    ),
   datasets: [
  {
    label: "Pain Score",
    data: sortedData.map((d) => d.score),

    borderColor: "#673ab7",   // 💜 main line color (purple)
    backgroundColor: "#673ab7",

    pointBackgroundColor: "#673ab7",
    pointBorderColor: "#fff",

    pointRadius: 5,
    pointHoverRadius: 7,

    borderWidth: 3,
    tension: 0.4,
  },
],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const point = sortedData[index];

            return [
              `Score: ${point.score}`,
              `Note: ${point.note || "No note"}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10
      }
    }
  };

  return (
    <div style={{ width: "800px", margin: "50px auto" }}>
      <h2>Pain Score Trend</h2>

      {dataPoints.length === 0 ? (
        <p>No pain data available</p>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}

export default PainGraph;