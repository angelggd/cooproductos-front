import {Bar} from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement,
    Tooltip, Legend, PointElement, 
    CategoryScale, LinearScale, BarElement,
    LineElement, Title, Filler} from "chart.js";

ChartJS.register(BarElement, ArcElement, Tooltip, Legend,
            PointElement, CategoryScale, LinearScale,
            LineElement, Title, Filler);

    

export default function GraficoBarras({valores,etiqueta,bgColor}) {
    const meses = ['Ene','Feb','Mar','Abr','May','Jun',
                   'Jul','Ago','Sep','Oct','Nov','Dic'];
    let rgb2 = '';
    let misOptions = {};
    switch(bgColor) {
        case 1:
           rgb2='rgba(96, 124, 219,0.5 )';
           break;
        case 2:
           rgb2='rgba(196, 35, 74,0.5 )';
           break;
        case 3:
           rgb2='rgba(40, 186, 20,0.5 )';
           break;
        case 4:
           rgb2='rgba(236, 240, 11,0.5 )';
           break;
        default:  
           rgb2='rgba(96, 124, 219,0.5 )';
    };
    let miData = {
        labels: meses,
        datasets: [{
           label: etiqueta,
           data: valores,
           backgroundColor: rgb2,
        }]
     };

     return (
        <Bar data={miData} options={misOptions}/>
     )

};