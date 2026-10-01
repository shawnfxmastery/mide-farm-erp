import { supabase } from "@/lib/supabase";

export type ReportPeriod =
  | "today"
  | "week"
  | "month"
  | "year"
  | "custom";

export type ReportDateRange = {
  startDate: string;
  endDate: string;
};

type RecordRow = Record<string, any>;

function getNigeriaDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
  }).format(new Date());
}

export function getDateRange(period: Exclude<ReportPeriod, "custom">): ReportDateRange {
  const today = getNigeriaDate();

  const [year, month, day] = today
    .split("-")
    .map(Number);

  const current = new Date(
    Date.UTC(year, month - 1, day)
  );

  const start = new Date(current);

  if (period === "week") {
    const dayOfWeek = current.getUTCDay();

    const daysFromMonday =
      dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    start.setUTCDate(
      current.getUTCDate() - daysFromMonday
    );
  }

  if (period === "month") {
    start.setUTCDate(1);
  }

  if (period === "year") {
    start.setUTCMonth(0, 1);
  }

  const end = new Date(current);

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function getRecordDate(row: RecordRow) {
  const possibleDates = [
    row.date,
    row.created_at,
    row.updated_at,
    row.used_at,
    row.usage_date,
    row.purchase_date,
  ];

  for (const value of possibleDates) {
    if (value) {
      const date = new Date(value);

      if (!Number.isNaN(date.getTime())) {
        return date;
      }
    }
  }

  return null;
}

function isInPeriod(
  row: RecordRow,
  dateRange: ReportDateRange
) {
  const recordDate = getRecordDate(row);

  if (!recordDate) return false;

  const nigeriaDate = new Intl.DateTimeFormat(
    "en-CA",
    {
      timeZone: "Africa/Lagos",
    }
  ).format(recordDate);

  return (
    nigeriaDate >= dateRange.startDate &&
    nigeriaDate <= dateRange.endDate
  );
}

export async function getReportStats(
  period: ReportPeriod = "today",
  customRange?: ReportDateRange
) {
  const dateRange =
    period === "custom"
      ? customRange
      : getDateRange(period);

  if (!dateRange || dateRange.startDate > dateRange.endDate) {
    throw new Error("Please choose a valid report date range.");
  }

  const [
    salesResult,
    expensesResult,
    productionResult,
    feedResult,
  ] = await Promise.all([
    supabase
      .from("egg_sales")
      .select("*"),

    supabase
      .from("expenses")
      .select("*"),

    supabase
      .from("egg_production")
      .select("*"),

    supabase
      .from("feed_usage")
      .select("*"),
  ]);

  if (salesResult.error) {
    throw salesResult.error;
  }

  if (expensesResult.error) {
    throw expensesResult.error;
  }

  if (productionResult.error) {
    throw productionResult.error;
  }

  if (feedResult.error) {
    throw feedResult.error;
  }

  const sales =
    (salesResult.data ?? []).filter((row) =>
      isInPeriod(row, dateRange)
    );

  const expenses =
    (expensesResult.data ?? []).filter((row) =>
      isInPeriod(row, dateRange)
    );

  const production =
    (productionResult.data ?? []).filter((row) =>
      isInPeriod(row, dateRange)
    );

  const feedUsage =
    (feedResult.data ?? []).filter((row) =>
      isInPeriod(row, dateRange)
    );

  const totalRevenue =
    sales.reduce(
      (sum, row) =>
        sum + Number(row.total_amount ?? 0),
      0
    );

  const totalExpenses =
    expenses.reduce(
      (sum, row) =>
        sum + Number(row.amount ?? 0),
      0
    );

  const totalCrates =
    production.reduce(
      (sum, row) =>
        sum + Number(row.crates ?? 0),
      0
    );

  const totalPieces =
    production.reduce(
      (sum, row) =>
        sum + Number(row.pieces ?? 0),
      0
    );

  const totalMortality =
    production.reduce(
      (sum, row) =>
        sum + Number(row.mortality ?? 0),
      0
    );

  const totalFeed =
    feedUsage.reduce(
      (sum, row) =>
        sum + Number(row.bags_used ?? 0),
      0
    );

  return {
    totalRevenue,
    totalExpenses,
    totalProfit:
      totalRevenue - totalExpenses,

    totalCrates,
    totalPieces,
    totalFeed,
    totalMortality,
  };
}
