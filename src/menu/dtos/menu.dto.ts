import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { runInThisContext } from "vm";
export class menuDTO{
    @IsNumber()
    @ApiProperty({
        description: 'Price',
        example: 10000,
        required: true
    })
    price: number;
    @IsString()
    @ApiProperty({
        description: 'Dish description',
        example: "seasonal",
        required: true
    })
    description: string;
    @IsString()
    @ApiProperty({
        description: 'Name of the dish',
        example: "mouse-pizza",
        required: true
    })
    name: string;
    @IsString()
    @ApiProperty({
        description: 'Recipies',
        example: "Ratatoullie",
        required: true
    })
    recipes: string;
    @IsString()
    @ApiProperty({
        description: 'image link',
        example: "https://th.bing.com/th/id/R.70b387cca17bf279da5909c3fcfe51b3?rik=I06xNoqSmyhvqg&riu=http%3a%2f%2fimages1.fanpop.com%2fimages%2fimage_uploads%2fRatatouille-ratatouille-847440_1280_1024.jpg&ehk=24ULC8KcOa1hdiUQ8Zj8MLpgD3ZnZvD8A60hoE6VMc0%3d&risl=&pid=ImgRaw&r=0",
        required: true
    })
    images: string;
}