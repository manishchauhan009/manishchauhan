import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
    try {
        const { public_id } = await request.json();

        if (!public_id) {
            return Response.json({ error: "public_id is required" }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(public_id);

        console.log("Cloudinary delete result:", result);

        return Response.json({ success: true, result });
    } catch (error) {
        console.error("Delete image error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
