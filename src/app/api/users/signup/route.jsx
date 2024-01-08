import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma.js";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You must provide a username and password to Sign Up",
      });
    }
    const _user = await prisma.user.findFirst({
      where: { username, password },
    });
    if (_user) {
      return NextResponse.json({
        success: false,
        error: "Username already exists. Please login.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET
    );
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
