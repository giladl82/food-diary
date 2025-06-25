import type { FoodEntry } from "@/components/schema";

export function exportToCSV(data: FoodEntry[], filename: string) {
  if (!data || !data.length) {
    console.error("No data to export");
    return;
  }

  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map(header => {
      const escaped = String(row[header as keyof FoodEntry]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}