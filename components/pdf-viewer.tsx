export default function PDFViewer({ fileId }: { fileId: string }) {
  const url = `https://drive.google.com/file/d/${fileId}/preview`

  return (
    <div className="w-full h-[90vh] rounded-lg overflow-hidden shadow-lg border border-gray-300">
      <iframe src={url} className="w-full h-full" allow="autoplay" title="PDF Viewer"></iframe>
    </div>
  )
}
