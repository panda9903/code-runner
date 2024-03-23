"use client";

import Loader from "@/app/loader";
import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [invoices, setInvoices] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    <div className="w-full h-screen flex p-8  flex-col">
      {loading && (
        <div>
          <Loader />
        </div>
      )}

      {invoices
        .filter((invoice: Submission) => invoice.id === parseInt(params.id))
        .map((invoice: Submission) => (
          <div key={invoice.id} className="flex flex-col">
            <div className="flex w-[95vw] justify-between">
              <div>
                <p>
                  Code submitted by{" "}
                  <span className=" text-2xl">{invoice.username}</span>
                </p>
                <p>
                  Code Language:{" "}
                  <span className=" capitalize font-semibold">
                    {invoice.code_language}
                  </span>
                </p>
              </div>

              <div>
                <p>
                  Submitted at: <span className="">{invoice.submitted_at}</span>
                </p>
              </div>
            </div>

            <div className="flex w-[95vw] justify-between mt-8">
              <p>
                Input is{" "}
                <span>{invoice.stdin === "" ? "NULL" : invoice.stdin}</span>
                <p>
                  Output is{" "}
                  <span>{invoice.output === "" ? "NULL" : invoice.output}</span>
                </p>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`${
                    invoice.status === "Accepted"
                      ? "text-green-700"
                      : "text-red-700"
                  } text-2xl`}
                >
                  {invoice.status}
                </span>
              </p>
            </div>

            <Editor
              className="mt-40 border-t-neutral-950"
              height="60vh"
              options={{ readOnly: true }}
              language={invoice.code_language}
              defaultValue={invoice.code}
            />

            <div className="flex items-center justify-around ">
              <Button>
                <Link href="/">Home</Link>
              </Button>
              <Button>
                <Link href="/">Submissions</Link>
              </Button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default page;
