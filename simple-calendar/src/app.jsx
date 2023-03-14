import './app.css'
import Calendar from './calendar.jsx';

export function App() {
  const data = Array(365).fill({text: '', brightness: 0,});
  for (let i = 0; i < data.length; i +=1) {
    data[0]
  }

  return (
    <Calendar year="2023" data={data}/>
  )
}
