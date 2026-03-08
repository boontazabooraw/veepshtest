import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Map, MapMarker, MarkerContent } from "@/components/ui/map"

const ShopCard = ({ long, lat, shopName, address }) => {
    return (
        <Card className="relative mx-auto w-full pt-0 overflow-hidden pointer-events-none">
            {
                long != null || lat != null ?
                    (
                        <Map center={[long, lat]} zoom={15} className="h-80 aspect-video">
                            <MapMarker longitude={long} latitude={lat}>
                                <MarkerContent className="relative">
                                    {/* <div className="absolute bg-red-300 size-1" /> */}
                                    <div className="absolute size-6 rounded-full bg-red-400 transform -translate-y-8 -translate-x-2.5"/>
                                    <div className="absolute size-3 bg-red-400 rotate-45 skew-20 transform -translate-y-4 -translate-x-1"/>
                                </MarkerContent>
                            </MapMarker>
                        </Map>)
                    :
                    (
                        <div className="h-80 bg-neutral-800 flex justify-center items-center"><p className="tracking-widest opacity-50">No Map Data Available.</p></div>)
            }
            <CardContent className="pointer-events-auto!">
                <CardTitle>{shopName}</CardTitle>
                <CardDescription>
                    {address}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default ShopCard;