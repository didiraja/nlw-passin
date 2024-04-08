import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: '5d495aeb-4896-488b-a943-65d738b26838',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: "Um evento para devs apaixonados por código",
      maximumAttendees: 120
    }
  })
}

seed().then(() => {
  console.log('Database seeded')
})