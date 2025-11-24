import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json(
      { error: "Acesso nao autorizado!" },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const dateString = searchParams.get("date") as string; // Formato esperado: YYYY-MM-DD
  const clinicId = request.auth?.user?.id;

  console.log("Clinic ID:", clinicId);

  if (!dateString) {
    return NextResponse.json({ error: "Data não informada!" }, { status: 400 });
  }

  if (!clinicId) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 400 }
    );
  }

  try {
    console.log("Processando datas...");

    // --- CORREÇÃO AQUI ---
    // Em vez de criar a data baseada no fuso local (split/new Date),
    // montamos a string ISO UTC manualmente.

    // Data Inicial: 2025-11-24T00:00:00.000Z
    const startDate = new Date(`${dateString}T00:00:00.000Z`);

    // Data Final: 2025-11-24T23:59:59.999Z
    const endDate = new Date(`${dateString}T23:59:59.999Z`);

    console.log("Start (UTC):", startDate.toISOString());
    console.log("End (UTC):", endDate.toISOString());

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: clinicId,
        appointmentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
      // Opcional: Ordenar por horário para facilitar a leitura no front
      orderBy: {
        time: "asc",
      },
    });

    console.log(`Encontrados: ${appointments.length}`);

    return NextResponse.json(appointments);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Falha ao buscar agendamentos" },
      { status: 500 } // Mudei para 500 pois é erro de servidor/query
    );
  }
});
