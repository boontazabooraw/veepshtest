import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Map } from "@/components/ui/map"

const ShopCard = ({ long, lat, shopName, address }) => {
    return (
        <Card className="relative mx-auto w-full pt-0 overflow-hidden">
            {
                long != null || lat != null ?
                    (<Map center={[long, lat]} zoom={15} className="h-80 aspect-video" />)
                    : (<div className="h-80 bg-slate-700 flex justify-center items-center"><p>No Map Data Available. :((</p></div>)
            }
            <CardContent>
                <CardTitle>{shopName}</CardTitle>
                <CardDescription>
                    {address}
                </CardDescription>
            </CardContent>



        </Card>
    )
}

export default ShopCard;