import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const {name, email, password } = await request.json();
    // validate email and password
    console.log({name, email, password });

    const hashedPassword = await hash(password, 10);

    const response = await query({
        query: "INSERT INTO user (name ,email, password) VALUES (?, ?, ?)",
        values:[name,email,hashedPassword]
    })

    console.log(response)

    const result = {
        insertId: response.insertId,
        affectedRows: response.affectedRows
    };

    console.log(result);

    return NextResponse.json({ message: 'success',...result });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({ message: 'error' });
  }

  
}