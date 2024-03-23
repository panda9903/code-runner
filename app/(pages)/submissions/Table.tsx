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
import Loader from "@/app/loader";

type Submission = {
  id: number;
  username: string;
  code_language: string;
  stdin: string;
  code: string;
  submitted_at: string;
  output: string;
  status: string;
};

function formatTimestamp(timestamp: string): string {
  const dateObj = new Date(timestamp);

  // Options for formatting the date and time
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  // Convert to local time zone before formatting
  dateObj.toLocaleString("en-US", options); // This doesn't modify the dateObj, but sets time zone

  return dateObj.toLocaleString("en-US", options);
}

export function TableDemo() {
  const [invoices, setInvoices] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log("useEffect");
    const getData = async () => {
      const tempInvoices: Submission[] = [];

      const res = await fetch(
        "https://code-runner-w97q.onrender.com/submissions"
      );
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
          submitted_at: formatTimestamp(submission.submitted_at),
          output: submission.output,
          status: submission.status,
        });
        //console.log(submission);
      });
      console.log("Invoices", tempInvoices);
      setInvoices(tempInvoices);
    };

    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  return (
    <div>
      {loading && (
        <div className="overlay fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <Table>
        <TableCaption>A list of your recent submissions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Username</TableHead>
            <TableHead>Code Language</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>stdin</TableHead>
            <TableHead>stdout</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Submitted At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="">{invoice.username}</TableCell>
              <TableCell>{invoice.code_language}</TableCell>
              <TableCell>{invoice.code}</TableCell>
              <TableCell className="">
                {invoice.stdin === "" ? "NULL" : invoice.stdin}
              </TableCell>
              <TableCell className="">
                {invoice.output === "" ? "NULL" : invoice.output}
              </TableCell>
              <TableCell className="">{invoice.status}</TableCell>
              <TableCell className="">{invoice.submitted_at}</TableCell>
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
    </div>
  );
}
