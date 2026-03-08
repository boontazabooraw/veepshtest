import { useEffect, useState } from 'react';
import ShopCard from '@/components/ShopCard';
import Filters from '@/components/Filters'
import { Button } from '@/components/ui/button';
import NoShopsError from '@/components/NoShopsError';
import { Spinner } from "@/components/ui/spinner"

function App() {
  const [shops, setShops] = useState([]);
  const [totalAll, setTotalAll] = useState(0)
  const [totalReturned, setTotalReturned] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState();
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const [municipality, setMunicipality] = useState('');
  const limit = 6;

  const handleMunicipality = (value) => {
    value === "All" ? setMunicipality('') : setMunicipality(value);
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {

        // Switch the fetch variable to localhost if in local development

        //const fetched = await fetch(`https://veepsh.onrender.com?municipality=${municipality}&limit=${limit}&page=${page}`);
        const fetched = await fetch(`http://localhost:3000?municipality=${municipality}&limit=${limit}&page=${page}`);

        let apiJson = await fetched.json();

        setShops(apiJson.data);
        setTotalReturned(apiJson.returned);
        setTotalAll(apiJson.count);

      } catch (err) {
        setError(err);
        console.error(error)
      } finally {
        setLoading(false);
        setFirstRenderDone(true);
      }
    }
    getData();

  }, [municipality, page]);

  return (
    <div className='min-h-screen relative'>
      {/* FILTERS */}
      <Filters onValueChange={handleMunicipality} />

      {/* MAIN CARDS */}
      <ul className="flex flex-wrap gap-6 justify-center h-full overflow-hidden w-screen">
        {
          !firstRenderDone ? (
            <div className='min-w-screen flex justify-center py-50'>
              <Spinner className="size-15" />
            </div>
          ) : (
            totalReturned > 0 ? (
              shops.map(item => (
                <li key={item.id} className='relative max-w-100 w-80 md:w-100'>
                  <ShopCard long={item.longitude} lat={item.latitude} shopName={item.name} address={item.address}
                    totalShops={totalReturned}
                    loading={`${isLoading ? "opacity-30" : "opacity-100"}`}
                  />
                </li>
              ))
            ) : (
              <>
                <NoShopsError />
              </>
            )
          )
        }
      </ul>

      {/* PAGINATION CONTROLS */}
      <div className={`${firstRenderDone ? 'flex' : 'hidden'} justify-center gap-5 w-full py-4`}>
        <Button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          variant="outline" className="rounded-full! h-15 w-15">&lt;</Button>
        <Button
          onClick={() => setPage(prev => Math.max(prev + 1, 1))}
          disabled={page === totalAll / limit || totalReturned < limit}
          variant="outline" className="rounded-full! h-15 w-15">&gt;</Button>
      </div>
    </div>
  )
}

export default App

/*

TODO
 - Search (To be fixed in the API)
 - Filters (STILL BUGGY)
 - Pagination (put TotalCount on API)
*/