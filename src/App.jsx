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
    <div className='min-h-screen relative place-content-center'>
      {/* FILTERS */}
      <Filters onValueChange={handleMunicipality} />

      {/* MAIN CARDS */}
      <ul className="relative gap-6 h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-6">
        {
          !firstRenderDone ? (
            <div className={`py-50 relative col-span-3`}>
              <Spinner className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 size-15" />
            </div>
          ) : (
            totalReturned > 0 ? (
              shops.map(item => (
                <li key={item.id} className={`relative min-w-50 min-h-60 lg:min-h-65 xl:min-h-95 col-span-1`}>
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