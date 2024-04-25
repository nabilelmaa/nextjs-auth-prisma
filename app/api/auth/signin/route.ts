import { db } from '@/backend/db';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const LoginFormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = LoginFormSchema.parse(body);

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { user: null, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET ?? '',
            { expiresIn: '1h' } 
        );
        return NextResponse.json(
            { user: { id: user.id, email: user.email }, token },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Oops...Something went wrong!' },
            { status: 500 }
        );
    }
};

