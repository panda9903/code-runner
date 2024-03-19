"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

type Submission = {
  id: number;
  username: string;
  code_language: string;
  stdin: string;
  code: string;
  submitted_at: string;
};

export function TableDemo() {
  const [invoices, setInvoices] = useState<Submission[]>([]);

  useEffect(() => {
    console.log("useEffect");
    const getData = async () => {
      const tempInvoices: Submission[] = [];

      const res = await fetch("http://localhost:3000/submissions");
      const data = await res.json();
      console.log(data);

      data.forEach((submission: Submission) => {
        var code = submission.code;
        if (code.length > 100) {
          code = code.substring(0, 100) + "...";
        }

        tempInvoices.push({
          id: submission.id,
          username: submission.username,
          code_language: submission.code_language,
          stdin: submission.stdin,
          code: code,
          submitted_at: submission.submitted_at,
        });
        console.log(submission);
      });
      console.log("Invoices", tempInvoices);
      setInvoices(tempInvoices);
    };

    getData();
  }, []);

  return (
    <Table>
      <TableCaption>A list of your recent submissions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Code Language</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>stdin</TableHead>
          <TableHead className="text-right">Submitted At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.username}</TableCell>
            <TableCell>{invoice.code_language}</TableCell>
            <TableCell>{invoice.code}</TableCell>
            <TableCell className="text-right">{invoice.stdin}</TableCell>
            <TableCell className="text-right">{invoice.submitted_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
