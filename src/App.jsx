import { useEffect, useState } from 'react';
import ShopCard from '@/components/ShopCard';
import Filters from '@/components/Filters'
import { Button } from '@/components/ui/button';
import NoShopsError from '@/components/NoShopsError';
import { Spinner } from "@/components/ui/spinner"

function App() {
  const [shops, setShops] = useState([]);
  const [totalReturned, setTotalReturned] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1)
  const [error, setError] = useState();
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const [municipality, setMunicipality] = useState('');
  const limit = 6;

  const handleMunicipality = (value) => {
    value === "All" ? setMunicipality('') : setMunicipality(value);
    setPage(1);
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {

        // Switch the fetch variable to localhost if in local development

        const fetched = await fetch(`https://veepsh.onrender.com?municipality=${municipality}&limit=${limit}&page=${page}`);
        //const fetched = await fetch(`http://localhost:3000?municipality=${municipality}&limit=${limit}&page=${page}`);

        let apiJson = await fetched.json();

        setShops(apiJson.shops);
        setLastPage(apiJson.meta.last_page);
        setTotalReturned(apiJson.meta.returned);

      } catch (err) {
        setError(err);
        console.error(err, error);
      } finally {
        setLoading(false);
        setFirstRenderDone(true);
      }
    }
    getData();

  }, [municipality, lastPage, page]);



  return (
    <div className='min-h-screen relative px-20'>
      {/* FILTERS */}
      <Filters onValueChange={handleMunicipality} />

      {/* MAIN CARDS */}
      <ul className="flex flex-wrap gap-6 justify-center h-full">
        {
          !firstRenderDone ? (
            <div className='min-w-screen flex justify-center py-50'>
              <Spinner className="size-15" />
            </div>
          ) : (
            totalReturned > 0 ? (
              shops.map(item => (
                <li key={item.id} className='relative max-w-100 w-80 md:w-100'>
                  <ShopCard long={item.longitude} lat={item.latitude} shopName={item.name} address={item.address} opening_hours={item.opening_hours}
                    loading={isLoading}
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

      {
        totalReturned != 0 && (
          <div className={`${firstRenderDone ? 'flex' : 'hidden'} justify-center gap-5 w-full py-4`}>
            <Button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              variant="outline" className="rounded-full! h-15 w-15">&lt;</Button>
            <Button
              onClick={() => setPage(prev => Math.max(prev + 1, 1))}
              disabled={page === lastPage}
              variant="outline" className="rounded-full! h-15 w-15">&gt;</Button>
          </div>
        )
      }
    </div>
  )
}

export default App

/*

TODO
 - Search (To be fixed in the API)
 - Filters (STILL BUGGY)
*/