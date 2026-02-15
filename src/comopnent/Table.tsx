
type Column<T> = {
    key: keyof T;
    label: string;
    getLabel?: (data: T[keyof T]) => string;
};

type TableProps<T> = {
    rows: T[];
    idKey: keyof T;
    columns: Column<T>[];
};

function Table<T>({ rows, columns, idKey }: TableProps<T>) {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key.toString()}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={`row-${row[idKey]}`}>
                        {columns.map((column) => (
                            <td key={column.key.toString()}>
                                {column.getLabel?.(row[column.key]) || String(row[column.key])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
