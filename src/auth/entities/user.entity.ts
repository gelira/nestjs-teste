import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc.id;
      delete ret._id;
      return ret;
    },
  },
  versionKey: false,
})
export class User {
  @Prop()
  nome: string;

  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  senha: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
