import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get("userId");
  const dateParam = searchParams.get("date"); // Esperado: "YYYY-MM-DD"

  if (!userId || userId === "null" || !dateParam || dateParam === "null") {
    return NextResponse.json(
      { error: "Parâmetros inválidos ou ausentes" },
      { status: 400 }
    );
  }
  console.log("antes do try: " + userId);

  try {
    const startDate = new Date(`${dateParam}T00:00:00.000Z`);
    const endDate = new Date(`${dateParam}T23:59:59.999Z`);

    console.log("Busca Início (UTC): ", startDate);
    console.log("Busca Fim (UTC): ", endDate);

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        times: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    });

    console.log(`Encontrados ${appointments.length} agendamentos.`);

    const blockedSlots = new Set<string>();

    for (const apt of appointments) {
      const { time, service } = apt;

      if (!service) continue;

      const requiredSlots = Math.ceil(service.duration / 30);

      const startIndex = user.times.indexOf(time);

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotToBlock = user.times[startIndex + i];
          if (slotToBlock) {
            blockedSlots.add(slotToBlock);
          }
        }
      }
    }

    const blockedTimesArray = Array.from(blockedSlots);

    console.log("Horários bloqueados finais:", blockedTimesArray);
    console.log("agendamentos: " + appointments);

    return NextResponse.json(blockedTimesArray);
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err);
    return NextResponse.json(
      { error: "Erro interno ao processar agendamentos" },
      { status: 500 }
    );
  }
}
