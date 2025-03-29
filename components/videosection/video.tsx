
const videoSections = [
  {
    title: "Wedding Videos",
    videos: [
      "https://youtu.be/tEK61syaF1o",
      "https://youtu.be/Avi3Gk2G0G0",
      "https://youtu.be/D77AbK2V0aI",
    ],
  },
  {
    title: "Pre-Wedding Videos",
    videos: [
      "https://youtu.be/eXcuKQDzZ9E",
      "https://youtu.be/kduO1hfW-Lc",
      "https://youtu.be/PPuxNT_H2GE",
    ],
  },
  {
    title: "Housewarming Videos",
    videos: [
      "https://youtu.be/z3N9fjZuV2s",
      "https://youtu.be/0jXv2G0_flc",
    ],
  },
];

export default function Video() {
  return (
    <div className="flex flex-col min-h-screen">
     {/* Video Sections */}
      {videoSections.map((section, index) => (
        <section key={index} className="py-20 bg-gray-50">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {section.videos.map((video, i) => (
                <iframe
                  key={i}
                  width="100%"
                  height="315"
                  src={video.replace("youtu.be", "www.youtube.com/embed")}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
