import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { buildAuthOptions } from "../auth/[...nextauth].api";

const availabilityBodySchema = z.object({
  availability: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    }),
  )
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const session : any = await getServerSession(req, res, buildAuthOptions(req, res));

  if(!session) {
    return res.status(401).end()
  }

  const { availability } = availabilityBodySchema.parse(req.body)

  //Isso vai mudar para createMany depois que começar a usar o mySQL no lugar do sqLite
  await Promise.all(
    availability.map(a => {
      return prisma.userAvailability.create({
        data: {
          week_day: a.weekDay,
          time_start_in_minutes: a.startTimeInMinutes,
          time_end_in_minutes: a.endTimeInMinutes,
          user_id: session.user.id,
        }
      })
    })
  )

  return res.status(201).end()

}
