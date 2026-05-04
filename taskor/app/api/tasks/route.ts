import { prisma } from "@/app/db";

export async function GET() {
  try {
    const tasks = await prisma.tasks.findMany();
    return Response.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return Response.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}