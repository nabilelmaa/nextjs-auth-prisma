import { hash } from 'bcryptjs';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/backend/db';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { username, email, password } = body;
    
    const existingUser = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
        return NextResponse.json(
            { user: null, message: 'User with this email already exists!' },
            { status: 409 }
        );
    } 
    const hashedPassword = await hash(password, 10);
    const createUser = await db.user.create({
         data: {
                username,
                email,
                password: hashedPassword,
                updatedAt: new Date()
            },
        });

    return NextResponse.json(
        { user: createUser, message: 'Account created successfully!' },
        { status: 200 }
      );
  } catch (error) {
    return NextResponse.json(
        { message: 'Opps...Something went wrong!' },
        { status: 500 }
      );
  }
};
