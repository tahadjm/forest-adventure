export const parks = [
  {
    id: "1",
    name: "Forest Adventure Nnnaba",
    location: "Ain Achir, Annaba",
    latitude: 33.8008,
    longitude: 7.3983,
    description:
      "participez à des activités de loisirs, de sport et de plein air",
    adminId: "1",
    imageUrl: "/park-annaba.jpg",
    videoUrl: "/clip.mp4",
    images: ["/park-annaba.jpg", "/park-annaba-2.jpg", "/park-annaba-3.jpg"],
  },
  {
    id: "2",
    name: "Forest Adventure Tipaza",
    location: "Tipaza, numidia land",
    latitude: 33.8008,
    longitude: 7.3983,
    description:
      "participez à des activités de loisirs, de sport et de plein air",
    adminId: "1",
    imageUrl: "/park-tipaza.jpg",
    videoUrl: "/clip.mp4",
    images: ["/park-tipaza.jpg", "/park-tipaza-2.jpg", "/park-tipaza-3.jpg"],
  },
];

export const changelog: {
  title: string;
  content: string;
  additionalContent?: string;
  images: string[];
}[] = [
  {
    title: "2025",
    content:
      "Ouverture officielle du Forest Adventure Tipaza (Numidia Land) avec un parcours accrobranche moderne, un espace Laser Game en plein air et de nouvelles zones de loisirs familiales.",
    images: ["/park-tipaza.jpg", "/park-tipaza-2.jpg", "/park-tipaza-3.jpg"],
  },
  {
    title: "2024",
    content:
      "Ajout de l’activité Laser Game au Forest Adventure Annaba, permettant aux visiteurs de profiter d’un espace interactif et compétitif en pleine nature.",
    additionalContent:
      "Ajout de l'l’activité mini quad au Forest Adventure Annaba, offrant aux aventuriers des parcours off-road uniques et sécurisés à travers la forêt.",
    images: [
      "/laser-game.jpg",
      "/laser-game-2.jpg",
      "/mini-quad.jpg",
      "/mini-quad-2.jpg",
    ],
  },
  {
    title: "2023",
    content:
      "Introduction de l’activité Quad au Forest Adventure Annaba, offrant aux aventuriers des parcours off-road uniques et sécurisés à travers la forêt.",
    images: ["/quad.jpg", "/quad-2.jpg", "/quad-3.jpg"],
  },
  {
    title: "2022",
    content:
      "Création du Forest Adventure Annaba, premier parc d’aventures de la région, proposant accrobranche, tir à l’arc et activités familiales en pleine nature.",
    images: ["/park-annaba.jpg", "/park-annaba-2.jpg", "/park-annaba-3.jpg"],
  },
];

export const MockNews: News[] = [
  {
    id: "1",
    title: "Promotion de l'activité Laser Game",
    content:
      "profite de promotion jusqu'a 50% de réduction sur les prix de l'activité Laser Game au Forest Adventure Annaba",
    imageUrl: "/laser-game.jpg",
    publishedAt: "2023-08-15",
    startDate: "2023-08-15",
    endDate: "2025-08-15",
  },
  {
    id: "2",
    title: "Promotion de l'activité Laser Game au Forest Adventure Annaba",
    content:
      "profite de promotion jusqu'a 50% de réduction sur les prix de l'activité Laser Game au Forest Adventure Annaba",
    imageUrl: "/laser-game.jpg",
    publishedAt: "2023-08-15",
    startDate: "2023-08-15",
    endDate: "2025-08-15",
  },
  {
    id: "3",
    title: "Promotion de l'activité Laser Game au Forest Adventure Annaba",
    content:
      "profite de promotion jusqu'a 50% de réduction sur les prix de l'activité Laser Game au Forest Adventure Annaba",
    imageUrl: "/laser-game.jpg",
    publishedAt: "2023-08-15",
    startDate: "2023-08-15",
    endDate: "2025-08-15",
  },
];
