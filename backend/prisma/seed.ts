import {PrismaClient,Status,Gender} from '../src/generated/prisma/client';
import { PrismaBetterSqlite3} from '@prisma/adapter-better-sqlite3'
import {join} from 'path'


const adapter = new PrismaBetterSqlite3({
    url: `file:${join(process.cwd(),'dev.db')}`

})

const prisma = new PrismaClient({adapter});

const characters:{
    image:string,
    name:string,
    status:Status,
    gender:Gender,
    description:string
}[]=[
{
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'Rick Sanchez',
    status: 'ALIVE',
    gender: 'MALE',
    description:
      'A genius scientist whose alcoholism and reckless portal-hopping constantly endanger his family.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    name: 'Morty Smith',
    status: 'ALIVE',
    gender: 'MALE',
    description:
      "Rick's anxious grandson, dragged across dimensions on adventures he rarely understands.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    name: 'Summer Smith',
    status: 'ALIVE',
    gender: 'FEMALE',
    description:
      "Morty's older sister, eager to prove she can handle the chaos of intergalactic life.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    name: 'Beth Smith',
    status: 'ALIVE',
    gender: 'FEMALE',
    description:
      "Rick's daughter, a horse surgeon torn between her father and her fragile marriage.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    name: 'Jerry Smith',
    status: 'ALIVE',
    gender: 'MALE',
    description:
      "Beth's insecure husband, perpetually out of his depth around his father-in-law.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/244.jpeg',
    name: 'Mr. Poopybutthole',
    status: 'ALIVE',
    gender: 'MALE',
    description:
      'A cheerful old friend of the family who is definitely not a parasite. Ooh-wee!',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/329.jpeg',
    name: 'Squanchy',
    status: 'ALIVE',
    gender: 'MALE',
    description:
      "A cat-like alien and old party friend of Rick's with a very flexible vocabulary.",
  },
   {
    image: 'https://rickandmortyapi.com/api/character/avatar/47.jpeg',
    name: 'Birdperson',
    status: 'DEAD',
    gender: 'MALE',
    description:
      "Rick's loyal warrior comrade from the Federation resistance, honorable to a fault.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    name: 'Abradolf Lincler',
    status: 'DEAD',
    gender: 'MALE',
    description:
      'A failed genetic experiment blending two historical figures into one conflicted being.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/361.jpeg',
    name: 'Toxic Rick',
    status: 'DEAD',
    gender: 'MALE',
    description:
      'The discarded toxic half of Rick, separated out and left to rot after a cleansing gone wrong.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/242.jpeg',
    name: 'Tammy Guetermann',
    status: 'DEAD',
    gender: 'FEMALE',
    description:
      "Summer's friend who turned out to be a deep-cover Galactic Federation agent.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/141.jpeg',
    name: 'Fly Fisherman Morty',
    status: 'DEAD',
    gender: 'MALE',
    description:
      'One of countless Mortys across the multiverse, met with an unfortunate early end.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
    name: 'Beta-Seven',
    status: 'DEAD',
    gender: 'UNKNOWN',
    description:
      'A hive-mind entity and former partner of Unity, undone during a violent reunion.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/265.jpeg',
    name: 'Diane Sanchez',
    status: 'DEAD',
    gender: 'FEMALE',
    description:
      "Rick's late wife, whose loss quietly drives much of his bitterness and grief.",
  },
    {
    image: 'https://rickandmortyapi.com/api/character/avatar/356.jpeg',
    name: 'Unity',
    status: 'UNKNOWN',
    gender: 'FEMALE',
    description:
      "A collective consciousness and one of Rick's old flames who can control entire populations.",
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/121.jpeg',
    name: 'Evil Morty',
    status: 'UNKNOWN',
    gender: 'MALE',
    description:
      'A coldly calculating Morty who slipped the leash and vanished beyond the Central Finite Curve.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/158.jpeg',
    name: 'Scary Terry',
    status: 'UNKNOWN',
    gender: 'MALE',
    description:
      'A dream-invading slasher who is surprisingly reasonable once you get to know him, b*tch.',
  },
  {
    image: 'https://rickandmortyapi.com/api/character/avatar/131.jpeg',
    name: 'Gearhead',
    status: 'UNKNOWN',
    gender: 'MALE',
    description:
      'A mechanical alien merchant and occasional business associate with a grudge against Rick.',
  },


]


async function main(){
    await prisma.character.deleteMany({})
    await prisma.character.createMany({data:characters})
    console.log('Database seeded successfully')
}


main().then(()=>prisma.$disconnect())
.catch(async(err)=>{
    console.error(err)
    await prisma.$disconnect();
    process.exit(1)
})