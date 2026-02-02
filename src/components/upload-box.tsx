'use client'

import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
import { useState } from 'react'

interface Props {
  label: string
  name: string
  description: string
  isLoading: boolean
}

function UploadBox({ label, name, description, isLoading }: Props) {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileName, setFileName] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div
      className="bg-white border rounded-xl p-4 shadow-sm space-y-2 w-full"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
          handleChange({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
        }
      }}
    >
      <h2 className="font-medium">{label}</h2>
      <p className="text-xs text-gray-500">{description}</p>

      <label
        className={cn("border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 block h-[20dvh]",
          preview && "h-[200px]",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          type="file"
          name={name}
          required
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={handleChange}
          disabled={isLoading}
        />

        {!preview && (
          <div className='flex flex-col items-center justify-center h-full'>
            <Upload className='w-10 h-10 text-gray-500' />
            <p className="text-gray-500 text-sm">
              Click to upload or drop file
            </p>
          </div>
        )}

        {preview && (
          <div className="space-y-2 h-full">
            <img
              src={preview}
              className="w-full h-full object-cover rounded"
              alt="Preview"
            />
            <p className="text-xs text-gray-500">{fileName}</p>
          </div>
        )}
      </label>
    </div>
  )
}

export default UploadBox;