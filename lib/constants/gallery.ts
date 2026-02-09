// 전체 24장의 갤러리 이미지
export const allGalleryImages = Array.from({ length: 24 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  const ext = i === 7 || i === 10 ? "png" : "jpg";
  return {
    title: `Wedding Gallery ${num}`,
    category: "Wedding",
    src: `/img/gallery/gallery_${num}.${ext}`,
    alt: `Wedding Photo ${num}`,
    aspect: "aspect-[2/3]",
  };
});
