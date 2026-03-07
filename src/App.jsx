import { useEffect, useState } from 'react';
import ShopCard from '@/components/ShopCard';

function App() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetched = await fetch('https://veepsh.onrender.com?limit=10');
      let apiJson = await fetched.json();

      setShops(apiJson.data)
    }

    getData();

  }, []);


  return (
    <div className='min-h-screen'>
      <ul className=" border flex flex-wrap gap-10 justify-center py-10">
        {
          shops.map(item => (
            <li key={item.id} className='relative w-100'>
              <ShopCard long={item.longitude} lat={item.latitude} shopName={item.name} address={item.address} />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App

//TODO