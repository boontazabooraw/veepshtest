import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Map, MapMarker, MarkerContent } from "@/components/ui/map"

const ShopCard = ({ long, lat, shopName, address, loading, opening_hours }) => {

    const bg_gradient_title = "bg-gradient-to-b from-black via-black to-transparent";
    const isLongLat = long != null || lat != null;

    return (
        <Card className={`absolute mx-auto h-full w-full pt-0 overflow-hidden transition-all duration-600 ${loading ? "opacity-30" : "opacity-100"}`}>
            <CardContent className={`xl:text-lg pointer-events-auto! absolute cardgradbg w-full font-light z-10 ${isLongLat && bg_gradient_title}`}>
                <CardTitle>{shopName}</CardTitle>
                <CardDescription>
                    <span className="text-xs xl:text-sm text-shadow-xl">{address}</span>
                </CardDescription>
            </CardContent>
            {
                isLongLat ?
                    (
                        <>
                            <a href={`https://maps.google.com?q=${lat},${long}`} target="_blank" rel="noopener noreferrer" className="absolute inset-0" />
                            <Map
                                center={[long, lat + .0008]} zoom={15} className="aspect-video relative pointer-events-none!">
                                <MapMarker longitude={long} latitude={lat}>
                                    <MarkerContent className="relative">
                                        {/* <div className="absolute bg-red-300 size-1" /> */}
                                        <div className="absolute size-6 rounded-full bg-red-400 transform -translate-y-8 -translate-x-2.5" />
                                        <div className="absolute size-3 bg-red-400 rotate-45 skew-20 transform -translate-y-4 -translate-x-1" />
                                    </MarkerContent>
                                </MapMarker>
                            </Map>
                        </>
                    )
                    :
                    (
                        <div className="h-2/2 bg-neutral-800 flex justify-center items-center relative">
                            <p className="tracking-widest opacity-50 pt-15">No Map Data Available.</p>
                        </div>
                    )
            }
            <CardFooter className="justify-center bg-neutral-800 border-t py-0.5 z-10">
                <span className="text-xs tracking-[3.5px] opacity-50">{opening_hours || "No Data Available."}</span>
            </CardFooter>
        </Card>
    )
}

export default ShopCard;