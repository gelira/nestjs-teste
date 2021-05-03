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
  UseGuards,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { PessoasService } from '../services/pessoas.service';
import { CreatePessoaDto } from '../dto/create-pessoa.dto';
import { UpdatePessoaDto } from '../dto/update-pessoa.dto';
import { ParseObjectIdPipe } from '../../pipes/mongodb-objectid.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ClientProxy } from '@nestjs/microservices';

@Controller('pessoas')
@UseGuards(JwtAuthGuard)
export class PessoasController {
  constructor(
    private readonly pessoasService: PessoasService,
    @Inject('TESTE_SERVICE') private client: ClientProxy,
  ) {}

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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('teste/:n')
  async teste(@Param('n', ParseIntPipe) n: number) {
    const moment = new Date();
    moment.setSeconds(moment.getSeconds() + 10);

    this.client.emit('quadrado', { time: moment.getTime(), numero: n });
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
