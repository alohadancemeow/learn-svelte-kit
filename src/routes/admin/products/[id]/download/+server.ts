import fs from 'fs/promises';
import { db } from '../../../../../hooks.server.js';


// This endpoint allows users to download product files 
// by visiting /admin/products/[id]/download , where [id] is the product ID. 
// The file is served with proper headers to trigger a download in the browser with the correct filename.
export async function GET({ params: { id } }) {
    const product = await db.product.findUnique({
        where: { id },
        select: {
            filePath: true,
            name: true
        }
    });

    if (!product) return new Response('product does not exist ');

    // Get the file size, read the file, and extract the file extension.
    // For example: "image.jpg" → ["image", "jpg"] → "jpg"
    const { size } = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split('.').pop();

    return new Response(file, {
        headers: {
            'Content-Type': `application/${extension}`,
            'Content-Length': size.toString(),
            'Content-Disposition': `attachment; filename=${product.name}.${extension}`
        }
    });
}