import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Always the latest resume.pdf on main in github.com/hspeiser/resume
  const pdfUrl = "https://raw.githubusercontent.com/hspeiser/resume/main/resume.pdf"

  try {
    // GitHub serves it as octet-stream, so proxy it to get a PDF the browser will show inline
    const response = await fetch(pdfUrl, { cache: "no-store" })

    if (!response.ok) {
      return new NextResponse(`Failed to fetch PDF: ${response.statusText}`, {
        status: response.status,
      })
    }

    // Get the PDF as an ArrayBuffer
    const buffer = await response.arrayBuffer()

    // Return the PDF with proper headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=Henry_Speiser_Resume.pdf",
        // Short cache so a newly pushed resume shows up within a few minutes
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=3600",
      },
    })
  } catch (error) {
    console.error("Error proxying PDF:", error)
    return new NextResponse(`Error proxying PDF: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
    })
  }
}
