import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return new NextResponse("URL parameter is required", { status: 400 })
  }

  try {
    // Fetch the model from the external URL
    const response = await fetch(url)

    if (!response.ok) {
      return new NextResponse(`Failed to fetch model: ${response.statusText}`, {
        status: response.status,
      })
    }

    // Get the file content as an ArrayBuffer
    const buffer = await response.arrayBuffer()

    // Return the file with appropriate headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error proxying model:", error)
    return new NextResponse(`Error proxying model: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
    })
  }
}
