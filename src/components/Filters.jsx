import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Filters = () => {
    return (
        <div className="flex justify-evenly pt-8">
            <Select>
                <SelectTrigger className="w-full max-w-80">
                    <SelectValue placeholder="Select Municipality" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Municipality</SelectLabel>
                        <SelectItem value="apple">Abucay</SelectItem>
                        <SelectItem value="banana">Bagac</SelectItem>
                        <SelectItem value="blueberry">Dinalupihan</SelectItem>
                        <SelectItem value="grapes">Hermosa</SelectItem>
                        <SelectItem value="pineapple">Limay</SelectItem>
                        <SelectItem value="pineapple">Mariveles</SelectItem>
                        <SelectItem value="pineapple">Morong</SelectItem>
                        <SelectItem value="pineapple">Orani</SelectItem>
                        <SelectItem value="pineapple">Orion</SelectItem>
                        <SelectItem value="pineapple">Pilar</SelectItem>
                        <SelectItem value="pineapple">Samal</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Filters