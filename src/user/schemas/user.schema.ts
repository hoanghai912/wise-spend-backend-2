import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';



@Schema()
export class User {
  @Prop()
    firstName: string;

    @Prop()
    lastName: string;


  @Prop({ unique: true })
  // @Index({ unique: true })
  username: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
// function Index(arg0: { unique: boolean; }): (target: User, propertyKey: "username") => void {
//   throw new Error('Function not implemented.');
// }

