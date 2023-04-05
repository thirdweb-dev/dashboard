// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from "airtable";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

  const base = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(
    "app47E4b88aZF8us3",
  );

  if (req.method === "POST") {
    const { email, address } = req.body;

    // Check if email is already in the database
    base("Table 1")
      .select({
        filterByFormula: `{Email} = "${email}"`,
      })
      .firstPage(function (err: any, records: any) {
        if (err) {
          console.error(err);
          return;
        }
        const found = records.length > 0;
        if (found) {
          res.status(500).json({ message: "Email already registered!" });
        } else {
          // Add email to the database
          base("Table 1").create(
            [
              {
                fields: {
                  Email: email,
                  Address: address,
                },
              },
            ],
            function (_err: any) {
              if (_err) {
                console.error(_err);
                return;
              }
            },
          );
          res.status(200).json({ message: "Email registered" });
        }
      });
  } else {
    res.status(500).json({ message: "Invalid request method" });
  }
}
