import Image from 'next/image'

export default function GallerySection() {
  const photos = [
    {
      src: '/images/IMG_6297.jpg',
      alt: 'Group of four friends in a casual room setting',
      width: 3024,
      height: 4032,
    },
    {
      src: '/images/IMG_8790.jpg',
      alt: 'Screen displaying various design projects and portfolio work',
      width: 1920,
      height: 1080,
    },
    {
      src: '/images/image.jpg',
      alt: 'Two speakers presenting on stage with an event background',
      width: 2000,
      height: 2667,
    },
  ]

  return (
    <section className="bg-neutral-50 py-16 px-4 md:px-8 gridism-content-layer">
      <div className="max-w-4xl mx-auto">
        <div className="columns-1 sm:columns-2 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="break-inside-avoid mb-6 overflow-hidden rounded-2xl shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 duration-300"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}