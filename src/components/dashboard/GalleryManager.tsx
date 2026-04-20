import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { GalleryImage } from '@/lib/types'

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [caption, setCaption] = useState('')

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order')
    if (data) setImages(data as GalleryImage[])
    setLoading(false)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file)

    if (uploadError) {
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName)

    await supabase.from('gallery_images').insert({
      image_url: urlData.publicUrl,
      caption: caption.trim(),
      sort_order: images.length,
    })

    setCaption('')
    setUploading(false)
    fetchImages()
    e.target.value = ''
  }

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm('Delete this image?')) return

    // Extract filename from URL
    const urlParts = image.image_url.split('/')
    const fileName = urlParts[urlParts.length - 1]

    await supabase.storage.from('gallery').remove([fileName])
    await supabase.from('gallery_images').delete().eq('id', image.id)
    setImages((prev) => prev.filter((img) => img.id !== image.id))
  }

  const handleReorder = async (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= images.length) return

    const updated = [...images]
    const temp = updated[index]
    updated[index] = updated[swapIndex]
    updated[swapIndex] = temp

    setImages(updated)

    // Update sort orders in DB
    await Promise.all(
      updated.map((img, i) =>
        supabase
          .from('gallery_images')
          .update({ sort_order: i })
          .eq('id', img.id)
      )
    )
  }

  const updateCaption = async (id: string, newCaption: string) => {
    await supabase
      .from('gallery_images')
      .update({ caption: newCaption })
      .eq('id', id)
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, caption: newCaption } : img))
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div className="bg-white/60 border border-charcoal/5 rounded-xl p-6">
        <h3 className="font-serif text-lg text-charcoal mb-4">Upload Image</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="flex-1 px-4 py-2.5 bg-white border border-charcoal/10 rounded-lg font-sans text-sm focus:outline-none focus:border-sage transition-colors"
          />
          <label className="px-6 py-2.5 bg-charcoal text-cream font-sans text-xs tracking-[0.1em] uppercase rounded-lg hover:bg-sage transition-colors cursor-pointer text-center inline-flex items-center gap-2 disabled:opacity-50">
            {uploading ? 'Uploading...' : '📸 Upload'}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Image grid */}
      {loading ? (
        <p className="text-center font-sans text-sm text-charcoal/40 py-12">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-center font-sans text-sm text-charcoal/40 py-12">No images yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-white border border-charcoal/5 rounded-xl overflow-hidden"
            >
              <img
                src={image.image_url}
                alt={image.caption || ''}
                className="w-full aspect-square object-cover"
              />
              <div className="p-3 space-y-2">
                <input
                  type="text"
                  defaultValue={image.caption || ''}
                  onBlur={(e) => updateCaption(image.id, e.target.value)}
                  placeholder="Caption..."
                  className="w-full px-0 py-1 bg-transparent border-b border-charcoal/5 font-sans text-xs focus:outline-none focus:border-sage transition-colors"
                />
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleReorder(index, 'up')}
                      disabled={index === 0}
                      className="text-[10px] text-charcoal/30 hover:text-charcoal disabled:opacity-20 transition-colors"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => handleReorder(index, 'down')}
                      disabled={index === images.length - 1}
                      className="text-[10px] text-charcoal/30 hover:text-charcoal disabled:opacity-20 transition-colors"
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(image)}
                    className="text-[10px] font-sans uppercase tracking-wider text-charcoal/30 hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
