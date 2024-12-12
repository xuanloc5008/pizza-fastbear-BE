import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class evaluating{
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'give the score',
        example: 80,
        required: true
    })
    score: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        description: 'leave the comment',
        example: "This is fucking good",
        required: true
    })
    feedbacks: string;
}