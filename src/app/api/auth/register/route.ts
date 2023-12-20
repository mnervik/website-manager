import { NextResponse } from 'next/server'

import { hash } from 'bcrypt'

import { db } from '@utils/server/prisma'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const exists = await db.user.findUnique({
    where: {
      email
    }
  })
  if (exists) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  } else {
    const user = await db.user.create({
      data: {
        email,
        password: await hash(password, 10)
      }
    })
    return NextResponse.json(user)
  }
}
