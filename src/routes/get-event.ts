import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/events/:eventId', {
      schema: {
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: {
            event: z.object({
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().nullable(),
              attendeesAmount: z.number().int(),
            })
          }
        },
      }
    }, async (request, reply) => {
      const { eventId } = request.params

      const event = await prisma.event.findUnique({
        select: {
          title: true,
          slug: true,
          details: true,
          maximumAttendees: true,
          _count: {
            select: {
              attendee: true
            }
          }
        },
        where: {
          id: eventId
        }
      })

      if (event === null) {
        throw new Error('Event not found')
      }

      const { title, slug, details, maximumAttendees, _count } = event;

      return reply.send({
        event: {
          title, slug, details, maximumAttendees,
          attendeesAmount: _count.attendee,
        }
      })
    })
}