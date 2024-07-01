import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    firstName: string;

    @Prop()
    middleName?: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    phoneNumber?: string;

    @Prop()
    resetPasswordOtp?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
