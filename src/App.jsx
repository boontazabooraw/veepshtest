import { useEffect, useState } from 'react';
import ShopCard from '@/components/ShopCard';
import { Button } from '@/components/ui/button';

function App() {
  const [shops, setShops] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isError, setError] = useState();
  const limit = 5

  useEffect(() => {
    const getData = async () => {
      const fetched = await fetch(`https://veepsh.onrender.com?limit=${limit}&page=${page}`);
      let apiJson = await fetched.json();

      setShops(apiJson.data)
    }

    getData();

  }, [page]);


  return (
    <div className='min-h-screen flex flex-col'>
      {/* MAIN CARDS */}
      <ul className="flex flex-wrap gap-10 justify-center py-10">
        {
          shops.map(item => (
            <li key={item.id} className='relative w-100'>
              <ShopCard long={item.longitude} lat={item.latitude} shopName={item.name} address={item.address} />
            </li>
          ))
        }
      </ul>
      {/* PAGINATION CONTROLS */}
      <div className='flex justify-center gap-5 pb-10'>
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          variant="outline" className="rounded-full! h-15 w-15">&lt;</Button>
        <Button
          onClick={() => setPage(prev => Math.max(prev + 1, 1))}
          disabled={page === 6}
          variant="outline" className="rounded-full! h-15 w-15">&gt;</Button>
      </div>
    </div>
  )
}

export default App

/*

TODO
 - Pagination
*/