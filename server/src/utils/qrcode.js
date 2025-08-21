import QRCode from 'qrcode';

export const generateQRDataUrl = async (text) => {
  return await QRCode.toDataURL(text, { margin: 1 });
};
