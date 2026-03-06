import { useEffect, useState } from 'react';
import { Map } from "@/components/ui/map"

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetched = await fetch('https://veepsh.onrender.com?municipality=balanga_city');
      let apiJson = await fetched.json();

      setShops(apiJson.data)
    }

    getData();

  }, []);


  return (
    <div className='min-h-screen min-w-screen'>
      <ul className="w-full h-full border flex">
        {
          shops.map(item => (
            <li key={item.id} className='h-50 w-100 p-0'><Map /></li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
