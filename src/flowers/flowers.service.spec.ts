import { Test } from '@nestjs/testing';
import { FlowersService } from './flowers.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('FlowersService', () => {
  let service: FlowersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FlowersService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn() }, // Простейший мок
        },
        {
          provide: PrismaService,
          useValue: {
            flower: {
              findMany: jest.fn().mockResolvedValue([
                {
                  id: 1,
                  name: 'Rouse',
                  color: 'red',
                  price: 10,
                },
              ]),
              create: jest.fn().mockResolvedValue({
                id: 2,
                name: 'Lily',
                color: 'white',
                price: 15,
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FlowersService>(FlowersService);
  });

  it('should return an array of flowers', async () => {
    const flowers = await service.findAll();
    expect(flowers).toEqual([
      {
        id: 1,
        name: 'Rouse',
        color: 'red',
        price: 10,
      },
    ]);
  });

  it('should create a new flower', async () => {
    const flower = await service.create({
      name: 'Lily',
      color: 'white',
      price: 15,
    });
    expect(flower).toEqual({
      id: 2,
      name: 'Lily',
      color: 'white',
      price: 15,
    });
  });
});
