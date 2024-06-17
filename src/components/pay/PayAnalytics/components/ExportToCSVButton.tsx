import { DownloadIcon } from "lucide-react";
import { Button } from "../../../../@/components/ui/button";

export function ExportToCSVButton(props: {
  getData: () => { header: string[]; rows: string[][] };
  fileName: string;
}) {
  return (
    <Button
      variant="outline"
      className="border flex gap-2 items-center text-xs"
      onClick={() => {
        exportToCSV(props.fileName, props.getData());
      }}
    >
      <DownloadIcon className="size-3" />
      Export as CSV
    </Button>
  );
}

function exportToCSV(
  fileName: string,
  data: { header: string[]; rows: string[][] },
) {
  const { header, rows } = data;
  const csvContent = `data:text/csv;charset=utf-8,${header.join(",")}\n${rows
    .map((e) => e.join(","))
    .join("\n")}`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
}
