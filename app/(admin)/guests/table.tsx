"use client";

import { Database } from "@/app/type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TableGuest() {
  const [data, setData] = useState<
    Database["public"]["Tables"]["guests"]["Row"][]
  >([]);
  const [filteredData, setFilteredData] = useState<
    Database["public"]["Tables"]["guests"]["Row"][]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  const columns: ColumnDef<Database["public"]["Tables"]["guests"]["Row"]>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "type",
      header: "Tipe",
      cell: (info) => {
        if (info.getValue() === "Teman") {
          return <Badge className="bg-blue-500 text-white">Teman</Badge>;
        } else if (info.getValue() === "Keluarga") {
          return <Badge className="bg-green-500 text-white">Keluarga</Badge>;
        } else if (info.getValue() === "Guru") {
          return <Badge className="bg-yellow-500 text-white">Guru</Badge>;
        } else if (info.getValue() === "Kerabat") {
          return <Badge className="bg-purple-500 text-white">Kerabat</Badge>;
        } else if (info.getValue() === "Rekan Kerja") {
          return (
            <Badge className="bg-orange-500 text-white">Rekan Kerja</Badge>
          );
        }
        return info.getValue();
      },
    },
    {
      accessorKey: "guest_num",
      header: () => <p className="text-center">Jumlah Tamu</p>,
      cell: (info) => (
        <p className="text-center">{info.getValue() as React.ReactNode}</p>
      ),
    },
    {
      accessorKey: "guest_num_attd",
      header: () => <p className="text-center">Jumlah Hadir</p>,
      cell: (info) => (
        <p className="text-center">{info.getValue() as React.ReactNode}</p>
      ),
    },
    {
      accessorKey: "is_present",
      header: "Hadir",
      cell: (info) =>
        info.getValue() ? (info.getValue() != null ? "Ya" : "Tidak") : null,
    },
    // actions column can be added here if needed
    {
      id: "actions",
      header: "Aksi",
      cell: (info) => {
        if (!info.row.original.guest_num_attd) {
          return (
            <Button size="sm" variant="outline">
              Hadir
            </Button>
          );
        }
      }, // Placeholder for actions
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const fetchData = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("guests").select("*");
    if (error) {
      console.error("Error fetching guests:", error);
      return;
    }
    setData(data || []);
    setFilteredData(data || []);
  };

  useEffect(() => {
    const channel = createClient()
      .channel("guests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "guests" },
        () => fetchData()
      )
      .subscribe();

    fetchData();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = data.filter((guest) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  return (
    <div className="flex items-center justify-center mb-4 w-full min-h-screen">
      <Card className="max-w-4xl w-full p-8 h-full min-h-[90vh]">
        <div className="flex justify-between gap-2 pb-4">
          <Input
            placeholder="Cari Tamu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="rounded-md border bg-background">
          <Table className="bg-background">
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="overflow-y-auto max-h-[75vh] bg-background">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default TableGuest;
