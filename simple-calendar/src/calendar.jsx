


function get_data(start_date, end_date, raw_data) {

 const dates = Array(365).fill(null).map(_ => ({text: '', value: 0}));


//  let start = new Date(start_date);
//  let end = new Date(start_date);

 let current_date = new Date(start_date);

 for (let i = 0; i < dates.length; i +=1) {

    dates[i].text = `${current_date.toDateString()}`
    current_date.setUTCDate(current_date.getUTCDate() + 1);
 }

for (let i = 0; i < raw_data.length; i +=1) {

    const raw = raw_data[i];
    const date = new Date(raw.timestamp)
    const index = daysIntoYear(date) - 1;

    if(raw_data[i].title) {
      dates[index].text = raw_data[i]?.title + ' ' + dates[index].text;
    }
    if(raw_data[i].value) {
      dates[index].value = raw_data[i].value 
    }
 }

 return dates;

}

export default function Calendar() {
  const raw_data = [
    {
    timestamp: new Date('2022-12-31').toUTCString(),
    title: 'Bro happening',
    value: 2,
  },
  {
    timestamp: new Date('2022-01-01').toUTCString(),
    title: 'Bro happening',
    value: 1,
  }

]
  const data = get_data('2022-01-01', '2022-12-31', raw_data);

  let x = 0;
  let y = 0;
  let count = 0;
  const width = 365 / 5 * 12 + 20 
  const rects = data.map(
    (d, index) => {

      const colors = {
        r: 255,
        g: 255,
        b: 255,
      };
      if (d.value > 0) {
        colors.r = 40;
        colors.g = 100;
        colors.b = 200;
      }
      const options = {
        width: '12px',
        height: '12px',
        x: 0,
        y: 0,
        style: `fill: rgb(${colors.r}, ${colors.g}, ${colors.b}); stroke-width: 2; stroke: rgb(100, 140, 200);`,
      };

      if (count === 5) {
        x += 12
        y = 0;
        count = 0
      } else if (count > 0) {
        y += 12;
      }
      count += 1;
      options.x = x;
      options.y = y;
      return <Rect options={options} key={index}>
        <title>{d.text}</title>
      </Rect>
    }
  )
  return <svg width={width} height='100%'>
    <g>
      {rects}
    </g>
  </svg>
}

function Rect(props) {
  return <rect {...props.options}>
    {props.children}
  </rect>
}

function daysIntoYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}