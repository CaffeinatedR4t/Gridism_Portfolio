"use client";

const MainClientsSection = () => {
  const clients = [
    {
      image: "/images/dddd@4x.png",
      label: "01 EZZRALE",
      width: 955,
      height: 913,
    },
    {
      image: "/images/image.png",
      label: "02 Alfred Situmorang",
      width: 828,
      height: 1104,
    },
  ];

  return (
    <section 
      className="relative w-full bg-white py-24"
      data-theme="light"
    >
      <div className="max-w-[1440px] mx-auto px-[8.68%]">
        {/* Heading */}
        <h2 
          className="text-[96px] leading-[116px] text-black font-normal text-justify mb-12"
          style={{
            fontFamily: 'Inter, sans-serif',
            width: '953px',
          }}
        >
          Main Clients
        </h2>

        {/* Client Cards */}
        <div className="flex gap-8 -ml-[6.6%]">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="relative flex-none"
              style={{
                width: `${client.width}px`,
                height: `${client.height}px`,
              }}
            >
              <img
                src={client.image}
                alt={client.label}
                className="w-full h-full object-cover"
              />
              
              {/* Label Overlay */}
              <div 
                className="absolute top-[68px] text-white text-[40px] leading-[48px] font-normal text-justify"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  left: index === 0 ? '653px' : '471px',
                }}
              >
                {client.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainClientsSection;