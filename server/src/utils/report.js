import PDFDocument from 'pdfkit';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

export const writeCSV = async (path, records) => {
  if (!records.length) return;
  const header = Object.keys(records[0]).map(k => ({ id: k, title: k }));
  const writer = createObjectCsvWriter({ path, header });
  await writer.writeRecords(records);
};

export const writePDF = async (path, title, records) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(fs.createWriteStream(path));
  doc.fontSize(18).text(title, { underline: true });
  doc.moveDown();
  records.forEach((r, i) => {
    doc.fontSize(12).text(`${i+1}. ${JSON.stringify(r)}`);
    doc.moveDown(0.5);
  });
  doc.end();
};
