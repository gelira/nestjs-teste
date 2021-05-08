import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'pessoas',
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
export class Pessoa {
  @Prop()
  nome: string;

  @Prop()
  idade: number;

  @Prop()
  sexo: string;
}

export type PessoaDocument = Pessoa & Document;

export const PessoaSchema = SchemaFactory.createForClass(Pessoa);
