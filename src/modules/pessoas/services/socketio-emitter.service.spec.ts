import { Test, TestingModule } from '@nestjs/testing';
import { SocketioEmitterService } from './socketio-emitter.service';

describe('SocketioEmitterService', () => {
  let service: SocketioEmitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketioEmitterService],
    }).compile();

    service = module.get<SocketioEmitterService>(SocketioEmitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
