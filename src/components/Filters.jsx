import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Filters = ({ onValueChange }) => {

    return (
        <div className="flex justify-center p-4">
            <Select onValueChange={onValueChange} >
                <SelectTrigger className="grow max-w-60">
                    <SelectValue placeholder="Select Municipality" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Municipality</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="abucay">Abucay</SelectItem>
                        <SelectItem value="bagac">Bagac</SelectItem>
                        <SelectItem value="balanga_city">Balanga City</SelectItem>
                        <SelectItem value="dinalupihan">Dinalupihan</SelectItem>
                        <SelectItem value="hermosa">Hermosa</SelectItem>
                        <SelectItem value="limay">Limay</SelectItem>
                        <SelectItem value="mariveles">Mariveles</SelectItem>
                        <SelectItem value="morong">Morong</SelectItem>
                        <SelectItem value="orani">Orani</SelectItem>
                        <SelectItem value="orion">Orion</SelectItem>
                        <SelectItem value="pilar">Pilar</SelectItem>
                        <SelectItem value="samal">Samal</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filters