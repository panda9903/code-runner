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
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Submission = {
  id: number;
  username: string;
  code_language: string;
  stdin: string;
  code: string;
  short_code: string;
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
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log("useEffect");
    const getData = async () => {
      const tempSubmissions: Submission[] = [];

      const res = await fetch(
        "https://code-runner-w97q.onrender.com/submissions"
      );
      const data = await res.json();
      console.log(data);

      data.forEach((submission: Submission) => {
        var code = submission.code;
        var short_code = code;
        if (code.length > 100) {
          short_code = code.substring(0, 100) + "...";
        }

        tempSubmissions.push({
          id: submission.id,
          username: submission.username,
          code_language: submission.code_language,
          stdin: submission.stdin,
          code: code,
          short_code: short_code,
          submitted_at: formatTimestamp(submission.submitted_at),
          output: submission.output,
          status: submission.status,
        });
      });
      console.log("Submissions", tempSubmissions);
      setSubmissions(tempSubmissions);
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
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell className="">{submission.username}</TableCell>
              <TableCell className=" capitalize">
                {submission.code_language}
              </TableCell>
              <TableCell>{submission.short_code}</TableCell>
              <TableCell className="">
                {submission.stdin === "" ? "NULL" : submission.stdin}
              </TableCell>
              <TableCell className="">
                {submission.output === "" ? "NULL" : submission.output}
              </TableCell>
              <TableCell className="">{submission.status}</TableCell>
              <TableCell className="">{submission.submitted_at}</TableCell>
              <TableCell className="text-right">
                <Button>
                  <Link href={`/submissions/${submission.id}`}>View Code</Link>
                </Button>
              </TableCell>
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
