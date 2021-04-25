import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { ParseObjectIdPipe } from '../pipes/mongodb-objectid.pipe';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  checkNotFound(pessoa: any) {
    if (!pessoa) {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get()
  findAll() {
    return this.pessoasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    const pessoa = await this.pessoasService.findOne(id);
    this.checkNotFound(pessoa);
    return pessoa;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updatePessoaDto: UpdatePessoaDto,
  ) {
    const pessoa = await this.pessoasService.update(id, updatePessoaDto);
    this.checkNotFound(pessoa);
    return pessoa;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    const pessoa = await this.pessoasService.remove(id);
    this.checkNotFound(pessoa);
  }
}
