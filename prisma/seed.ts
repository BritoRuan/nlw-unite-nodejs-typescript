import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
   data:{
    id: '4fd2f889-432d-4e49-82ab-5e7f99e58bd6',
    title: 'Unite Summit',
    slug: 'unite-summit',
    details: 'Um evento p/devs apaixonados(as) por código!',
    maximumAttendees: 120
   }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})