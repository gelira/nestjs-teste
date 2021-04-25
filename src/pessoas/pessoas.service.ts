import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa, PessoaDocument } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectModel(Pessoa.name) private pessoaModel: Model<PessoaDocument>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const pessoa = new this.pessoaModel(createPessoaDto);
    return pessoa.save();
  }

  findAll() {
    return this.pessoaModel.find().exec();
  }

  findOne(id: string) {
    return this.pessoaModel.findById(id).exec();
  }

  async update(id: string, updatePessoaDto: UpdatePessoaDto) {
    const filter = { _id: id };
    const { n } = await this.pessoaModel.updateOne(filter, updatePessoaDto);
    if (n === 0) {
      return null;
    }
    return this.pessoaModel.findById(id);
  }

  async remove(id: string) {
    const pessoa = await this.pessoaModel.findById(id);
    if (!pessoa) {
      return null;
    }
    return pessoa.remove();
  }
}
