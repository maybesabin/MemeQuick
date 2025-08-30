import Meme from "@/models/Meme";
import { connectToDb } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDb();
        const memes = await Meme.find();
        return NextResponse.json({ message: "Memes fetched successfully", memes }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}

export async function POST(req: Request) {
    try {
        await connectToDb()
        const { email, password, name, imageUrl } = await req.json();

        if (!name || !imageUrl || !email || !password) return NextResponse.json({ message: "Please provide all fields" }, { status: 400 })

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ message: "Unauthorized User" }, { status: 400 })
        }

        const meme = await Meme.findOne({
            $or: [
                { name },
                { imageUrl }
            ]
        })
        if (meme) return NextResponse.json({ message: "Similar meme already exists" }, { status: 400 })

        const newMeme = new Meme({
            name,
            imageUrl
        })
        await newMeme.save()
        return NextResponse.json({ message: "Successfully created meme" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}