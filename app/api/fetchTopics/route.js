"use server";
import DBconnect from "../../../libs/mongodb";
import MainTopic from "../../../models/mainTopic";
import SubTopic from "../../../models/subTopic";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await DBconnect();
    const [mainTopics, subTopics] = await Promise.all([
      MainTopic.find({}).sort({ createdAt: -1 }),
      SubTopic.find({}).sort({ createdAt: -1 }),
    ]);
    return NextResponse.json({ mainTopics, subTopics }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error(error);
  }
}
