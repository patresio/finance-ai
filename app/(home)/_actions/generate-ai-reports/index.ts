"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateAiReportsSchema, type GenerateAiReportSchema } from "./schema";

export const generateAiReports = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportsSchema.parse({ month });
  // TODO: Pegar o mês das transações
  // TODO: Pegar o ano das transações
  // montar um agente de IA para melhorar o código !!!
  //const { SYSTEM_PROMPT, USER_PROMPT } = AgentAI()
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await clerkClient().users.getUser(userId);
  const hasPlanPremium = user.publicMetadata.subscriptionPlan === "premium";

  if (!hasPlanPremium) {
    throw new Error("You need a premium plan to generate AI reports");
  }

  if (!process.env.GOOGLE_API_KEY || !process.env.GOOGLE_GENERATIVE_MODEL) {
    throw new Error(
      "GOOGLE API KEY not found or GOOGLE GENERATIVE MODEL not found",
    );
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({
    model: process.env.GOOGLE_GENERATIVE_MODEL,
  });

  // TODO: Pegar as transações do mes atual
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${new Date().getFullYear()}-${month}-01`),
        lte: new Date(`${new Date().getFullYear()}-${month}-31`),
      },
    },
  });
  // mandas as transações para a IA para gerar um relatório com base nas transações fazendo um insight
  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;
  const system = `Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.`;

  const result = await model.generateContent([system, content]);
  const response = await result.response;
  const text = response.text();
  // pegar o relatório gerado e retornar ao usuário
  return text;
  // TODO: Futuramente salvar o relatório gerado no banco de dados
};
