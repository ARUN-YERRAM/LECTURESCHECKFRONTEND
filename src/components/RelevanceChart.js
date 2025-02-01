import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RelevanceChart = () => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://localhost:5000/api/calculate_similarity')
      .then(response => {
        setScores(response.data.similarity*100);
        console.log(response.data.similarity)
      })
      .catch(error => {
        console.error('There was an error fetching the similarity scores!', error);
      });
  }, []);

  if (scores === null) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: ['File A vs. File B'],
    datasets: [
      {
        label: 'Similarity Score',
        data: [scores],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Relevance Between Text Files',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <>
    <Navbar/>
    <Sidebar/>
    <div style={{ width: '75%', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>

    </>
  );
};

export default RelevanceChart;


