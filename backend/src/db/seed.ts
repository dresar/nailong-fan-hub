import { db } from "./index";
import * as schema from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database with extensive dummy data...");

  // --- Users ---
  const passwordHash = await bcrypt.hash("password123", 10);
  const userList = [
    { username: "AdminNailong", email: "admin@nailong.com", passwordHash, role: "admin", points: 5000 },
    { username: "NailongLover88", email: "lover88@fan.hub", passwordHash, points: 1000 },
    { username: "DragonFan", email: "dragon@fan.hub", passwordHash, points: 450 },
    { username: "YellowKing", email: "king@fan.hub", passwordHash, points: 780 },
    { username: "MamaFan", email: "mama@fan.hub", passwordHash, points: 120 },
    { username: "MemeQueen", email: "queen@fan.hub", passwordHash, points: 2000 },
    { username: "BiboStan", email: "bibo@fan.hub", passwordHash, points: 300 },
    { username: "ChubbyCheeks", email: "chubby@fan.hub", passwordHash, points: 1500 },
    { username: "MilkDragon", email: "milk@fan.hub", passwordHash, points: 2500 },
    { username: "GembulLover", email: "gembul@fan.hub", passwordHash, points: 600 },
  ];

  for (const u of userList) {
    await db.insert(schema.users).values(u).onConflictDoNothing();
  }

  const allUsers = await db.select().from(schema.users);

  // --- Characters ---
  await db.insert(schema.characters).values([
    { id: "nailong", name: "Nailong", role: "Naga Susu Utama", desc: "Naga kuning bulat, polos & gembul. Suka makan dan peluk-peluk. Karakter utama yang sangat dicintai.", img: "https://placehold.co/600x400?text=Nailong+Happy" },
    { id: "nailong-angry", name: "Angry Nailong", role: "Bentuk Marah", desc: "Saat Nailong marah, ekspresinya jadi meme legendaris seluruh dunia. Biasanya karena makanannya diambil.", img: "https://placehold.co/600x400?text=Nailong+Angry" },
    { id: "mama-long", name: "Mama Long", role: "Ibu Nailong", desc: "Penyayang, sabar, selalu menyiapkan makanan untuk Nailong. Sosok ibu yang ideal.", img: "https://placehold.co/600x400?text=Mama+Long" },
    { id: "papa-long", name: "Papa Long", role: "Ayah Nailong", desc: "Tegas tapi lembut, suka mengajak Nailong berpetualang. Pahlawan bagi Nailong.", img: "https://placehold.co/600x400?text=Papa+Long" },
    { id: "xiao-long", name: "Xiao Long", role: "Sahabat", desc: "Naga kecil teman bermain Nailong sehari-hari. Selalu setia menemani.", img: "https://placehold.co/600x400?text=Xiao+Long" },
    { id: "bomboong", name: "Bomboong", role: "Saingan Lucu", desc: "Karakter naga lain yang sering muncul dan bersaing kelucuan dengan Nailong.", img: "https://placehold.co/600x400?text=Bomboong" },
  ]).onConflictDoNothing();

  // --- Episodes ---
  const episodes = Array.from({ length: 24 }, (_, i) => ({
    id: `ep-${i + 1}`,
    title: `Petualangan Nailong #${i + 1}: ${["Mencari Susu", "Main di Taman", "Marah karena Es Krim", "Ketemu Teman Baru", "Belajar Terbang", "Lomba Lari"][i % 6]}`,
    duration: `${2 + (i % 5)}:${String((i * 7) % 60).padStart(2, "0")}`,
    views: `${(150 + i * 15).toFixed(0)}K`,
    season: i < 12 ? 1 : 2,
    thumb: `https://placehold.co/600x400?text=Episode+${i + 1}`,
    desc: `Episode ke-${i + 1} yang penuh dengan tawa dan keceriaan bersama Nailong dan kawan-kawan.`,
  }));
  await db.insert(schema.episodes).values(episodes).onConflictDoNothing();

  // --- Memes ---
  const memes = Array.from({ length: 30 }, (_, i) => ({
    id: `meme-${i + 1}`,
    title: ["Marah Mode", "Senyum Polos", "Lapar", "Bingung", "Senang", "Mau Peluk", "Shock", "Cool", "Tidur"][i % 9] + ` v${Math.floor(i / 9) + 1}`,
    likes: Math.floor(Math.random() * 20000) + 500,
    img: `https://placehold.co/600x400?text=Meme+${i + 1}`,
    tag: ["reaction", "funny", "cute", "trending"][i % 4],
  }));
  await db.insert(schema.memes).values(memes).onConflictDoNothing();

  // --- News ---
  const news = Array.from({ length: 15 }, (_, i) => ({
    slug: `nailong-update-${i + 1}`,
    title: [
      "Nailong Tembus 1 Miliar Views di Douyin!",
      "Episode Spesial Tahun Baru Diumumkan",
      "Kolaborasi Nailong x Brand Ternama",
      "Plush Nailong Sold Out di Hari Pertama",
      "Nailong vs Bomboong: Perang Meme Memanas",
      "Mama Long Trending di Twitter",
      "Animator Nailong Buka Suara",
      "Konvensi Fans Nailong Pertama di Indonesia",
      "Update Game Mobile Nailong Dash",
      "Lagu Tema Nailong Versi Remix Rilis",
      "Nailong Menang Award Karakter Terlucu 2024",
      "Teaser Film Layar Lebar Nailong",
      "Pop-up Cafe Nailong Buka di Jakarta",
      "Konten Pendidikan Nailong untuk Anak-anak",
      "Wawancara Eksklusif Pengisi Suara Nailong",
    ][i] || `Update Nailong Terbaru #${i + 1}`,
    date: `${(i % 28) + 1} Mei 2025`,
    excerpt: "Berita panas dari semesta Nailong yang wajib kamu ketahui hari ini. Jangan sampai ketinggalan update terbarunya!",
    cover: `https://placehold.co/1200x600?text=News+${i + 1}`,
    body: "Nailong terus mencuri hati jutaan penggemar di seluruh dunia dengan ekspresi lucunya yang ikonik. Dalam update kali ini, kita akan membahas detail lebih lanjut mengenai kesuksesan yang diraih...",
  }));
  await db.insert(schema.news).values(news).onConflictDoNothing();

  // --- Products ---
  const products = Array.from({ length: 15 }, (_, i) => ({
    id: `prod-${i + 1}`,
    name: ["Plush Nailong 30cm", "Mug Angry Nailong", "Kaos Nailong Gold", "Keychain Mini", "Hoodie Mama Long", "Stiker Pack", "Topi Bucket", "Tote Bag", "Poster A2", "Phone Case", "Pajamas Set", "Notebook", "Tumbler", "Slippers", "Umbrella"][i],
    price: [299000, 89000, 149000, 49000, 399000, 35000, 99000, 79000, 59000, 125000, 350000, 45000, 115000, 185000, 150000][i],
    img: `https://placehold.co/600x600?text=Product+${i + 1}`,
    rating: (4 + (i % 10) / 10).toString(),
    stock: 10 + i * 3,
  }));
  await db.insert(schema.products).values(products).onConflictDoNothing();

  // --- Posts ---
  const posts = Array.from({ length: 20 }, (_, i) => ({
    id: `post-${i + 1}`,
    userId: allUsers[i % allUsers.length].id,
    author: allUsers[i % allUsers.length].username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${allUsers[i % allUsers.length].username}`,
    time: `${i + 1} jam lalu`,
    title: ["Koleksi plush ku akhirnya lengkap!", "Episode 7 bikin nangis 😭", "Drawing Nailong fanart", "Nailong vs Bomboong, kamu tim mana?", "Tips dapetin merch limited", "Siapa yang udah nonton ep terbaru?", "Meme ini lucu banget!", "Review plush baru", "Prediksi season 3", "Halo fans baru!"][i % 10],
    body: "Halo fellow fans! Mau share pengalaman seru ku dengan Nailong minggu ini. Rasanya sangat menyenangkan bisa menjadi bagian dari komunitas ini.",
    likes: Math.floor(Math.random() * 1000) + 50,
    comments: Math.floor(Math.random() * 200) + 10,
    cover: `https://placehold.co/600x400?text=Post+${i + 1}`,
  }));
  await db.insert(schema.posts).values(posts).onConflictDoNothing();

  // --- Leaderboard ---
  const leaderboardEntries = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    name: ["GoldDragonKing", "NailongMaster", "ChubbyFan", "MemeLord", "MamaLongStan", "YellowHeart", "DragonHunter", "PlushCollector", "EpisodeNerd", "FanartGuru", "MilkDragon", "BiboFriend", "NailongArmy", "DragonKnight", "MemeQueen", "YellowVibes", "HappyNaga", "GembulPower", "SusuNaga", "LegendLong"][i],
    points: 15000 - i * 650,
    badge: i === 0 ? "Legendary" : i < 5 ? "Epic" : i < 12 ? "Rare" : "Common",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`,
  }));
  await db.insert(schema.leaderboard).values(leaderboardEntries).onConflictDoNothing();

  // --- Events ---
  const events = Array.from({ length: 10 }, (_, i) => ({
    id: `ev-${i + 1}`,
    title: ["Nailong Fan Meetup Jakarta", "Watch Party Episode Final", "Cosplay Contest", "Merch Drop Launch", "AMA dengan Animator", "Charity Stream", "Nailong Art Exhibition", "Workshop Gambar Nailong", "Tournament Nailong Dash", "Pop-up Store Opening"][i],
    date: `${10 + i * 3} Juni 2025`,
    location: ["Jakarta", "Online", "Bandung", "Surabaya", "Online", "Online", "Yogyakarta", "Bali", "Medan", "Jakarta"][i],
    cover: `https://placehold.co/1200x600?text=Event+${i + 1}`,
  }));
  await db.insert(schema.events).values(events).onConflictDoNothing();

  // --- FAQs ---
  const faqs = [
    { question: "Siapa itu Nailong?", answer: "Nailong adalah karakter naga kuning yang lucu dan polos dari Tiongkok yang menjadi viral karena ekspresinya." },
    { question: "Di mana bisa menonton Nailong?", answer: "Anda bisa menontonnya di Douyin, TikTok, YouTube, dan tentunya di Nailong Fan Hub!" },
    { question: "Apakah ada merchandise resmi?", answer: "Ya, kami menjual berbagai merchandise resmi di bagian Shop kami." },
    { question: "Bagaimana cara mendapatkan poin?", answer: "Anda bisa mendapatkan poin dengan berinteraksi di komunitas, membuat postingan, dan berpartisipasi dalam event." },
    { question: "Apakah Nailong punya teman?", answer: "Ya, Nailong punya banyak teman seperti Xiao Long dan sering bertemu Bomboong." },
  ];
  await db.insert(schema.faqs).values(faqs).onConflictDoNothing();

  // --- Gallery Items ---
  const gallery = Array.from({ length: 20 }, (_, i) => ({
    id: `gal-${i + 1}`,
    img: `https://placehold.co/600x800?text=Gallery+${i + 1}`,
    category: ["Wallpaper", "Fanart", "Official", "Meme"][i % 4],
    title: `Karya Nailong #${i + 1}`,
  }));
  await db.insert(schema.galleryItems).values(gallery).onConflictDoNothing();

  // --- Collection Items ---
  const collection = Array.from({ length: 15 }, (_, i) => ({
    id: `coll-${i + 1}`,
    name: ["Kartu Emas", "Badge Perunggu", "Stiker Langka", "Token Naga", "Sertifikat Fan", "Pita Merah", "Koin Kuning", "Topi Mini", "Susu Kotak", "Permen Naga", "Buku Gambar", "Pensil Ajaib", "Tas Kecil", "Payung Kuning", "Kipas Angin"][i],
    rarity: ["Legendary", "Epic", "Rare", "Common"][i % 4],
    img: `https://placehold.co/300x300?text=Item+${i + 1}`,
    owned: Math.random() > 0.5,
  }));
  await db.insert(schema.collectionItems).values(collection).onConflictDoNothing();
  
  // --- Products ---
  await db.insert(schema.products).values([
    { id: "p1", name: "Boneka Nailong Gembul 30cm", price: 150000, img: "https://images.unsplash.com/photo-1559449134-88574bc8888d?w=400", rating: "4.9", stock: 100, affiliateUrl: "https://shopee.co.id/nailong-plush", category: "Boneka" },
    { id: "p2", name: "Gantungan Kunci Naga Susu", price: 25000, img: "https://images.unsplash.com/photo-1582142839970-2b9e04b60f25?w=400", rating: "4.7", stock: 500, affiliateUrl: "https://shopee.co.id/nailong-keychain", category: "Aksesoris" },
    { id: "p3", name: "T-Shirt Nailong VS Bomboong", price: 120000, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400", rating: "4.8", stock: 200, affiliateUrl: "https://shopee.co.id/nailong-tshirt", category: "Pakaian" },
    { id: "p4", name: "Stiker Set Nailong Lucu", price: 15000, img: "", rating: "4.5", stock: 1000, affiliateUrl: "https://shopee.co.id/nailong-stickers", category: "Alat Tulis" },
  ]);

  await db.insert(schema.reports).values([
    { reporter: "FanSetia99", target: "Komentar Spam", reason: "Spam iklan judi di post terbaru.", status: "pending" },
    { reporter: "NailongHater1", target: "Meme Toxic", reason: "Menghina karakter Nailong secara berlebihan.", status: "pending" },
    { reporter: "Moderator_Alpha", target: "User: BomboongLover", reason: "Melakukan harassment di komunitas.", status: "pending" },
  ]);

  console.log("Seeding completed successfully with large data and reports!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
