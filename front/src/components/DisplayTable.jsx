import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
  const table = useReactTable({
    data,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-2">
      <table className="w-full border-collapse">
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>Código</th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={`transition-colors duration-200 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-300`}
            >
              <td className="px-2 py-1">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-1 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4"></div>
    </div>
  );
};

export default DisplayTable;
