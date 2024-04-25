import { db } from '@/backend/db';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from "bcrypt";
import * as z from 'zod';

const FormSchema = z.object({
    username: z.string().min(1, 'Username is required').max(50),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
});

export const GET = async() => {
  return NextResponse.json({message: "Hello!"});
}
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
