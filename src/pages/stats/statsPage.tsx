import BarChart from "../../component/charts/barChart";
import DonutChart from "../../component/charts/donutChart";
import LineChart from "../../component/charts/lineChart";
import RadarChart from "../../component/charts/radarChart";
import PieChart from "../../component/charts/pieChart";
import BubbleChart from "../../component/charts/bubbleChart";
import MixedChart from "../../component/charts/mixedChart";
import StackedAreaChart from "../../component/charts/stackedAreaChart";
import StackedBarChart from "../../component/charts/stackedBarChart";
import StepChart from "../../component/charts/stepChart";
import PolarChart from "../../component/charts/polarChart";
import ScatterChart from "../../component/charts/scatterChart";
import StripChart from "../../component/charts/stripChart";




function Charts() {

    const data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
        datasets: [
          {
            label: 'Ventes 2024',
            data: [26, 59, 80, 88, 56, 55],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };

      const donutData = {
        labels: ['Rouge', 'Bleu', 'Jaune'],
        datasets: [
          {
            label: 'Nombre de Votes',
            data: [11, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

       // Données pour le graphique linéaire
  const lineData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'],
    datasets: [
      {
        label: 'Visiteurs Uniques',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  // Données pour le graphique à radar
  const radarData = {
    labels: ['Manger', 'Boire', 'Dormir', 'Design', 'Coder', 'Courir', 'Nager'],
    datasets: [
      {
        label: 'Personne A',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40],
        borderWidth: 1,
      },
      {
        label: 'Personne B',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27, 100],
        borderWidth: 1,
      }
    ]
  };

  const pieData = {
    labels: ['Rouge', 'Bleu', 'Jaune', 'Vert'],
    datasets: [
      {
        data: [170, 50, 100, 75], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)' 
        ],
      },
    ],
  };
  

  const stackedAreaData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [50, 100, 150, 200],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: true,
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: true,
      }
    ],
  };

  const mixedChartData = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril'],
    datasets: [
      {
        type: 'line' as const, // Utilisez 'as const' pour assurer que le type est 'line'
        label: 'Dataset 1',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        fill: false,
        data: [50, 25, 50, 75],
      },
      {
        type: 'bar' as const, // Utilisez 'as const' pour assurer que le type est 'bar'
        label: 'Dataset 2',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [75, 50, 75, 50],
        borderColor: 'white',
        borderWidth: 2,
      },
      // ... d'autres datasets si nécessaire
    ],
  };

  const bubbleData = {
    datasets: [
      {
        label: 'Premier ensemble de données',
        data: [
          { x: 5, y: 15, r: 10 },
          { x: 12, y: 20, r: 10 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  // Données pour le graphique en escalier
  const stepData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Première série de données',
        data: [0, 20, 17, 60, 60],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
        tension: 0.1,
        stepped: true,
      },
    ],
  };

  // Données pour le graphique à barres empilées
  const stackedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Série A',
        data: [50, 60, 70, 180, 190],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Série B',
        data: [28, 48, 40, 19, 86],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };
  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const polarData = {
    labels: ['Rouge', 'Vert', 'Bleu', 'Jaune', 'Violet', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [11, 16, 7, 3, 14, 6],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        borderWidth: 1
      }
    ]
  };

  const scatterChartData = {
    datasets: [
      {
        label: 'Groupe A',
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 0.5, y: 5.5 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Groupe B',
        data: [
          { x: -5, y: 5 },
          { x: -2, y: -3 },
          { x: 1, y: -7 },
          { x: 5, y: -3 },
        ],
        backgroundColor: 'rgba(54, 162, 235, 1)',
      }
    ],
  };


  const stripChartData = {
    datasets: [
      {
        label: 'Distribution des Valeurs',
        data: Array.from({ length: 100 }, () => ({
          x: Math.random() * 100, 
          y: 0.5 + (Math.random() - 0.5) * 0.1 
        })),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      }
    ],
  };


  return (
    <div className="flex flex-col gap-20 bg-secondary-light p-2 h-full">
        < BarChart data={data} />
        < DonutChart data={donutData} />
        < LineChart data={lineData} />
        < RadarChart data={radarData} />
        < PieChart data={pieData} />
        < BubbleChart data={bubbleData} />
        < MixedChart data={mixedChartData} />
        < StackedAreaChart data={stackedAreaData} />
        < StepChart data={stepData} />
        < StackedBarChart data={stackedData} options={options}/>
        < PolarChart data={polarData} />
        < ScatterChart data={scatterChartData} />
        < StripChart data={stripChartData} />
        <p>...</p>
    </div>
  )
}

export default Charts